<template>
  <div>
    <Hello />
    <router-view></router-view>
  </div>
</template>

<script>
  import Hello from '@/components/Hello'
  export default {
    name: 'app',
    components: {
      Hello
    }
  }
</script>
