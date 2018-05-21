<template lang="html">
  <div class="backNav2">
    <span class="backNav2-icon" @click="fnBack"></span>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  computed:{
    title(){
      return this.$route.query.name;
    }
  },
  methods: {
    fnBack(){
      this.$router.back();
    }
  }
}
</script>

<style lang="css">
.backNav2{
  position: fixed;
  z-index: 99;
  top: 3.25rem;
  left: 0;
  width: 24rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #fff;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
}
.backNav2-icon{
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: url("../assets/back2.png") no-repeat;
  background-size: 100%;
}
</style>
