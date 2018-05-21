<template lang="html">
  <div>
    <mt-navbar v-model="selected" fixed style="top: 3.25rem">
      <mt-tab-item v-for="item in navList" :id="item.path" :key="item.path" @click.native="toggle(item)">
        <span class="navBar-text">{{item.name}}</span>
      </mt-tab-item>
    </mt-navbar>

    <div style="height: 6.2rem"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navList: [
        {
          name: '新歌',
          path: '/'
        },
        {
          name: '排行',
          path: '/rank'
        },
        {
          name: '歌单',
          path: '/plist'
        },
        {
          name: '歌手',
          path: '/singer'
        }
      ]
    }
  },
  computed: {
    selected: {
      get(){
        return this.$store.state.selectedNav;
      },
      set(newValue){
        this.$store.dispatch('changeNav', newValue);
      }
    }
  },
  methods: {
    toggle(item){
      this.$router.push(item.path);
    }
  }
}
</script>

<style lang="css">
  .navBar-text{
    font-size: 1.14rem;
    color: #000;
  }
</style>
