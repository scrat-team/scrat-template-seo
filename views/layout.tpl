<!doctype html>
{% html %}
  {% head %}
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <!-- 删除苹果默认的工具栏和菜单栏 -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 设置苹果工具栏颜色 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- 忽略页面中的数字识别为电话，忽略email识别 -->
    <meta name="format-detection" content="telphone=no, email=no" />
    <!-- 启用360浏览器的极速模式(webkit) -->
    <meta name="renderer" content="webkit">
    <!-- 避免IE使用兼容模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true">
    <!-- 微软的老式浏览器 -->
    <meta name="MobileOptimized" content="320">
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
    <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">
    <!-- 适应移动端end -->

    <!-- title需要使用title标签包裹起来 -->
    {% title %}{{title}}{% endtitle %}

    <!-- 引用静态资源，替代script、link标签 -->
    {% require "./lib/md.js" %}
    {% require "./lib/pagelet.js" %}
    {% require "./lib/normalize.css" %}
    {% require "./layout.css" %}
  {% endhead %}
  {% body %}
    <div class="main" id="main">
      <!-- 引用组件 -->
      {% require "header" %}
      {% require "nav" %}
      <div class="content" id="content">
        <!-- 定义一个block，用于页面继承 -->
        {% block content %}{% endblock %}
      </div>
      {% require "footer" %}
    </div>
  {% endbody %}
  <!--livereload-->
{% endhtml %}