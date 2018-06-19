<template>
  <div>
    <h1>scss</h1>
    <h2>{{msg}}</h2>
    <div class="name">class name</div>
    <div class="test"> class test</div>
    <img src="../assest/abc.jpeg" alt="">
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      msg: '我是msg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../scss/test.scss');
.test{
  color: pink
}
</style>

