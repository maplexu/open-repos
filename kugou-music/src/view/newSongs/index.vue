<template lang="html">
  <div class="">
    <mt-swipe class="carousel" v-if="bannerList.length > 0">
      <mt-swipe v-for="item,index in bannerList" :key="index">
        <img :src="item.imgurl" alt="" class="carousel-img">
      </mt-swipe>
    </mt-swipe>
    <div style="height: 0.2rem"></div>
    <ul class="newSongs-list">
      <li class="newSongs-listItem" v-for="item, index in dataList">
        <span>{{item.filename}}</span>
        <img style="float: right; width: 1.2rem; height: 1.2rem; margin-right: 1.2rem;margin-top: 1.4rem;" src="static/img/download.png" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getNewSongsList } from 'api/newSongs.js'
export default {
  async mounted(){
    try{
      let data = await getNewSongsList();
      this.bannerList = data.banner;
      this.dataList = data.data;
    }catch(e){
      console.log(e);
    }
  },
  data(){
    return {
      bannerList: [
      ],
      dataList: [
      ]
    }
  }
}
</script>

<style lang="css">
  .carousel{
    height: 8.57rem;
  }
  .carousel-img{
    display: block;
    max-width: 24rem;
    height: 8.57rem;
    margin: 0 auto;
  }
  .newSongs-list{
    padding-left: 0.7rem;
  }
  .newSongs-listItem{
    height: 4rem;
    line-height: 4rem;
    font-size: 1rem;
    border-bottom: 1px solid #ccc;
  }
</style>
