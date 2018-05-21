<template lang="html">
  <div class="">
    <ul class="singerList">
      <li class="singerList-item" v-for="item in dataList" :key="item.classid" @click="fnShow(item.classid, item.classname)">
          <p>{{item.classname}}</p>
          <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
export default {
  async mounted(){
    try{
      let data = await getSingerList();
      console.log(data);
      this.dataList = data.list;
    }catch(e){

    }
  },
  data(){
    return {
      dataList: []
    }
  },
  methods: {
    fnShow(id, name){
      this.$router.push(`/detailList?id=${id}&type=singer&name=${name}`);
    }
  }
}
</script>

<style lang="css">
  .singerList{
    margin: 1rem 0.7rem;
  }
  .singerList-item{
    position: relative;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  .singerList-item p {
    font-size: 1rem;
  }
  .singerList-item i{
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    width: 1rem;
    height: 1rem;
    background: url('../../assets/more.png') no-repeat;
    background-size: 100%;
  }
</style>
