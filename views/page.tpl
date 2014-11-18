{% extends 'layout.tpl' %}

{% block content %}
  <h1>其他页面内容</h1>
  <div id="pagelet1">
    {% pagelet 'score' %}
    这里是一个叫 `score` 的区域
    {% endpagelet %}
  </div>
  <div id="pagelet2">
    {% pagelet 'joke' %}
    这里是一个叫 `joke` 的区域
    {% endpagelet %}
  </div>
{% endblock %}