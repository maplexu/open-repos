<template>
  <div class="header">
    <!-- header组件主要分成三个区块 -->

    <!-- 区块1····主要内容展示区域  -->
    <div class="content-wrapper">
      <!-- 商家的logo图片 -->
      <div class="avator">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <!-- 具体描述商家的内容（包括 商家名/外卖描述/优惠信息） -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <!-- 区块2····公告展示区域 -->
    <div class="bulletin-wrapper">

    </div>
    <!-- 区块3····header组件的背景图层 -->
    <div class="background">

    </div>
  </div>
</template>

<script>
  export default {
    created(){
      //如下的图标的类名会根据后台获取的数据中的 type值 来进行选择
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted(){
      console.log(this.seller);
    },
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/mixins/mixin.scss';

  .header {
    position: relative;
    overflow: hidden;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);       /*这边使用rgba来定义背景的透明度，使得底层的图片能展示出来*/

    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0px;
      .avator {
        display: inline-block;
        vertical-align:  top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
          }
          .name {
            display: inline-block;
            margin-left: 6px;
            font-size: 16px;
            font-weight: bold;
            color: rgb(255, 255, 255);
            line-height: 18px;
          }
        }
        .description {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
        }
        .support {
          margin-bottom: 2px;
          font-size: 0px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            vertical-align: top;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('decrease_1');
            }
            &.discount {
              @include bg-image('discount_1');
            }
            &.guarantee {
              @include bg-image('guarantee_1');
            }
            &.invoice {
              @include bg-image('invoice_1');
            }
            &.special {
              @include bg-image('special_1');
            }
          }
          .text {
            display: inline-block;
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        height: 24px;
        padding: 0 8px;
        border-radius: 12px;
        line-height: 24px;
        font-size: 10px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {

        }
        .icon-key_arrow_right {
          margin-left: 2px;
        }
      }
    }
  }
</style>
