<template>
  <div id="app">
    <!-- 顶部header -->
    <mt-header class="header" fixed>
      <router-link to="/" slot="left">
        <img class="logo" src="static/img/logo.png" alt="酷狗音乐" />
      </router-link>
      <router-link to="search" slot="right">
        <img class="searchBtn" src="static/img/search.png" alt="搜索" />
      </router-link>
    </mt-header>

    <router-view name="nav"/>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 24 + "px";
  }
}
</script>

<style>
  .header{
    height: 3.25rem;
  }
  .logo{
    height: 1.7rem;
    margin-left: 0.7rem;
  }
  .header .searchBtn{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.5rem;
  }
</style>
