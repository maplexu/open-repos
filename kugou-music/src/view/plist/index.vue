<template lang="html">
  <div class="">
    <ul class="plist">
      <li class="plist-item" v-for="item in dataList" :key="item.specialid" @click="fnShow(item.specialid, item.specialname)">
        <img :src="item.imgurl" alt="">
        <div class="plist-item-content">
          <p>{{item.specialname}}</p>
          <div>
            <i></i><span>{{item.playcount}}</span>\
          </div>
        </div>
        <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {getPlistList} from 'api/plist'
export default {
  async mounted(){
    try{
      let data = await getPlistList();
      console.log(data);
      data.plist.list.info.forEach(item => {
        item.imgurl = item.imgurl.replace('{size}', 400);
      })
      this.dataList = data.plist.list.info;
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
      this.$router.push(`/detailList?id=${id}&type=plist&name=${name}`);
    }
  }
}
</script>

<style lang="css">
  .plist{

  }
  .plist-item{
    border-bottom: 1px solid #ccc;
    padding: 0.75rem;
    position: relative;
  }
  .plist-item img{
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    width: 5.37rem;
    height: 5.37rem;
  }
  .plist-item-content{
    min-height: 5.37rem;
    margin: 0 2rem 0 6.2rem;
    font-size: 1rem;
    line-height: 1;
  }
  .plist-item-content p{
    padding-top: 1.43rem;
  }
  .plist-item-content>div{
    padding: 0.4rem 0;
    font-size: 0.78rem;
    color: #9b9b9b;
  }
  .plist-item-content>div>i{
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.25rem;
    background: url('../../assets/headset.png') no-repeat;
    background-size: 100%;
  }

  .plist-item>i{
    position: absolute;
    right: 1.25rem;
    top: 2.95rem;
    width: 1rem;
    height: 1rem;
    background: url('../../assets/more.png') no-repeat;
    background-size: 100%;
  }
</style>
