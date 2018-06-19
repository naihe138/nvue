<template>
  <div>
    <test />
    <router-view></router-view>
  </div>
</template>

<script>
import test from '@/components/test'
export default {
  name: 'app',
  components: {
    test
  }
}
</script>
