<template lang="html">
  <div class="">
    <ul class="rankList">
      <li class="rankList-item" v-for="item in dataList" :key="item.rankid" @click="fnShow(item.rankid, item.rankname)">
        <img :src="item.imgurl" alt="">
        <span>{{item.rankname}}</span>
        <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRankList } from 'api/rank.js'
export default {
  async mounted(){
    try{
      let data = await getRankList();
      //对获取的数据进行处理（获取的图片的路径要修改一下，将路径中的{size}换成400）
      data.rank.list.forEach(item => {
        item.imgurl = item.imgurl.replace('{size}', 400);
      })
      this.dataList = data.rank.list;
    }catch(e){
      console.log(e);
    }
  },
  data(){
    return {
      dataList: []
    }
  },
  methods: {
    fnShow(id, name){
      this.$router.push(`/detailList?id=${id}&type=rank&name=${name}`);
    }
  }
}
</script>

<style lang="css">
  .rankList{

  }
  .rankList-item{
    border-bottom: 1px solid #ccc;
    padding: 0.75rem;
  }
  .rankList-item img{
    width: 5.37rem;
    height: 5.37rem;
  }
  .rankList-item span{
    display: inline-block;
    line-height: 5.37rem;
    vertical-align: top;
    padding-left: 0.75rem;
    font-size: 1.2rem;
  }
  .rankList-item i {
    float: right;
    width: 1rem;
    height: 1rem;
    margin-top: 2.2em;
    margin-right: 0.5rem;
    background: url('../../assets/more.png') no-repeat;
    background-size: 100%;
  }
</style>
