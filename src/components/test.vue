<template>
  <div class="box">
    <h1 style="color: #00bfff">N-VUE</h1>
    <h2>{{msg}}</h2>
    <div class="name"></div>
    <div class="test">一款高度定制可配置的vue项目webpack打包器</div>
    <img style="border-radius: 4px;" src="../assest/abc.jpeg" alt="测试图片">
    <div class="btn">
      <router-link to="/">home</router-link>|
      <router-link to="/foo">foo</router-link>|
      <router-link to="/bar">bar</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        msg: '自定义打包器'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('../scss/test.scss');
  .box {
    text-align: center;
  }
  .test{
    color: #666666;
    margin-bottom: 20px;
  }
  .btn {
    color: #00bfff;
    a {
      cursor: pointer;
      padding: 0 5px;
    }
  }
</style>

