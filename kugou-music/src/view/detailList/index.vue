<template lang="html">
  <div class="detailContainer" v-if="isLoading == false">
    <div class="detailImg">
      <img :src="dataList.info.banner7url" alt="">
      <p><span style="padding-left: 1rem;"></span>上次更新事件： {{time}}</p>
    </div>
    <ul class="detailList">
      <li class="detailList-item" v-for="item,index in dataList.songs.list">
        <span class="detailList-item-number">{{index}}</span>
        <span>{{item.filename}}</span>
        <img src="static/img/download.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { getRankData, getPlistData, getSingerData } from 'api/detailList.js'
import transformTime from 'utils/transformTime'
export default {
  async mounted(){
    let {id, type} = this.$route.query;
    this.type = type;
    this.isLoading = true;
    let data;
    try{
      if(type == 'rank'){
        data = await getRankData(id);
        data.info.banner7url = data.info.banner7url.replace('{size}', 400);
        this.dataList = data;
      }else if(type == 'plist'){
        data = await getPlistData(id);
      }else if(type="singer"){
        data = await getSingerData(id);
      }else{
        return;
      }
      this.isLoading = false;
      console.log(data);
    }catch(e){
      console.log(e);
    }
  },
  data(){
    return {
      type: '',
      dataList: {},
      title: '',
      isLoading: true
    }
  },
  computed: {
    time(){
      if(this.dataList.songs && this.dataList.songs.timestamp){
        return transformTime(this.dataList.songs.timestamp*1000)
      }else{
        return ;
      }
    }
  }
}
</script>

<style lang="css">
  .detailImg{
    position: relative;
    height: 12.5rem;
    overflow: hidden;
  }
  .detailImg img {
    width: 100%;
    margin-top: -5rem;
  }
  .detailImg p {
    position: absolute;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    left: 0;
    bottom: 0;
    background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.6), transparent);
    color: #fff;
    font-size: 0.8rem;
  }

  .detailList-item{
    position: relative;
    border-bottom: 1px solid #ccc;
    height: 4rem;
    line-height: 4rem;
    font-size: 1rem;
  }
  .detailList-item-number{
    padding: 0 1rem;
    line-height: 1rem;
    font-size: 0.7rem;
  }
  .detailList-item img{
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: 1.2rem;
    top: 1.8rem;
  }
</style>
