<template>
  <div class="home">
    <div class="p-5">
      <h3 v-if="owner" >Welcome {{this.userName}} to Your Lora networks App</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userName: 'guest',
    }
  },
  computed: {
    owner() {
      this.userName = this.$store.getters.getUserName;
      return true
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
</style>
