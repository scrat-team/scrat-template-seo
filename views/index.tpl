{% extends 'layout.tpl' %}

{% block content %}
  <h1>首页内容</h1>
  <div id="pagelet1">
    <!-- pagelet区域，用于局部刷新 -->
    {% pagelet 'news' %}
    这里是一个叫 `news` 的区域
    {% endpagelet %}
  </div>
  <div id="pagelet2">
    <!-- pagelet区域，用于局部刷新 -->
    {% pagelet 'picture' %}
    这里是一个叫 `picture` 的区域
    {% endpagelet %}
  </div>
{% endblock %}