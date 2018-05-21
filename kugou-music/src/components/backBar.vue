<template lang="html">
  <div class="backNav">
    <span class="backNav-icon" @click="fnBack"></span>
    <span>搜索</span>
  </div>
</template>

<script>
export default {
  methods: {
    fnBack(){
      this.$router.back();
    }
  }
}
</script>

<style lang="css">
.backNav{
  position: relative;
  width: 24rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1rem;
  border-bottom: 1px solid #ccc;
}
.backNav-icon{
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: url("../assets/back.png") no-repeat;
  background-size: 100%;
}
</style>
