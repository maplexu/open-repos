<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from 'views/header'

import { getSeller } from 'api/seller.js'

const ERR_OK = 0;     //将正确响应的响应码定义一下，方便以后的修改

export default {
  created(){
    getSeller().then( res => {
      if(res.errno == ERR_OK){
        this.seller = res.data;
      }
    })
  },
  name: 'app',
  components: {
    'v-header': header
  },
  data(){
    return {
      seller: {},     //seller存放商家的数据（通过异步请求获取该对象）
    }
  }
}
</script>

<style lang="scss">

@import './styles/index.scss';

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-1px(rgba(7, 17, 27, 0.1));        //引入1px的边框
  .tab-item {
    flex: 1;
    text-align: center;
    & > a{
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active{
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
