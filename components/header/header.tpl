<div class="header">
  Header
</div>
{% script %}
  var head = require('./header.js');
  head.sayHi('{{title}}');
{% endscript %}