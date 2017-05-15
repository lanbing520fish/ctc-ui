<template>
  <div>
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>
<script>
import header from '@/components/header/';
export default {
  data() {
    return {}
  },
  created() {
    var role = this.$route.query.role;
    role == 'admin' && this.$store.dispatch('toggleRole', role);
    this.$store.dispatch('fetchDirectories');
  },
  components: {
    'v-header': header
  }
}
</script>

<style>
</style>
