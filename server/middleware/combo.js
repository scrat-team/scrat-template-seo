'use strict';

var path = require('path'),
    fs = require('fs');

// check if the filepath is potentially malicious
function isMalicious(filepath) {
    var ext = path.extname(filepath);
    return ext !== '.css' && ext !== '.js' || filepath.indexOf('../') !== -1;
}

module.exports = function (options, app, PROD) {
    var root = options.root,
        useCache = options.cache,
        logger = app.get('logger') || console,
        lastHash, cached = {};
    return function (req, res) {

        if(PROD && req.headers['if-modified-since']){
            res.status(304).end();
            return
        }

        var i = req.originalUrl.indexOf('??'),
            j = req.originalUrl.indexOf('&'),
            url, ext, hash, files, contents = [], rs;
        if (~i) {
            url = ~j ? req.originalUrl.slice(i + 2, j) : req.originalUrl.slice(i + 2);
            ext = path.extname(url);
            if (ext) res.type(ext.slice(1));
            if (~j) hash = req.originalUrl.slice(j + 1);
            if (hash !== lastHash) {
                lastHash = hash;
                cached = {};
            }
            if(PROD){
                res.setHeader('Expires', 'Mon, 1 Jan 2100 00:00:00 GMT')
                res.setHeader('Last-Modified', 'Mon, 1 Jan 2100 00:00:00 GMT')
                res.setHeader('Cache-Control', 'public, max-age=' + 60 * 60 * 24 * 365);
                res.setHeader('Pragma', 'public');
            }
            files = url.split(',');
            files.forEach(function (file) {
                if(useCache && cached.hasOwnProperty(file)){
                    contents.push(cached[file]);
                } else if(isMalicious(file)){
                    logger.error('[combo] malicious file: ' + file);
                } else {
                    var filePath = path.resolve(root, file), content;
                    try {
                        content = fs.readFileSync(filePath, 'utf-8');
                        contents.push(content);
                        if(useCache){
                            cached[file] = content;
                        }
                    } catch (e) {
                        logger.error('[combo] cannot read file: ' + filePath + '\n', e.stack);
                    }
                }
            });
            if (contents.length !== files.length) {
                res.status(404).end();
            } else {
                res.send(contents.join('\n'));
            }
        } else {
            res.send('I am a combo service :)');
        }
    };
};
