<template>
  <div class="box-wrap">
    <div class="top-tip">
      <p>在线用户:</p>
      <span>{{ onLineUserNum }}</span>
    </div>
    <div class="user-box">
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
      <div class="user-item">
        <div class="avatar-border">
          <img src="http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg" alt="">
        </div>
        <p class="nickname">
          星球用户A00001
        </p>
        <p class="address">湖北 武汉</p>
      </div>
    </div>
   


  </div>
</div></template>

<script>
import { mapState } from "vuex";

export default {
  name: "MemberList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["onLineUserNum"]),
  },
};
</script>

<style lang="less" scoped>
.box-wrap {
  .top-tip {
    display: flex;
    font-size: 15px;
    font-weight: 400;

    span {
      margin-left: 20px;
    }
  }

  .user-box {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;



    .user-item {
      width: 200px;
      height: 100px;
      background: #323644;
      margin: 15px 30px;
      cursor: pointer;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      transition: transform 0.3s;
      will-change: transform;


      .avatar-border {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 50%;
        overflow: hidden;


        img {
          display: block;
          width: 40px;
          height: 40px;
          object-fit: cover;
          margin: 2px;
        }
      }


      .nickname {
        position: absolute;
        font-size: 14px;
        top: 10px;
        left: 65px;
      }

      .address{
        position: absolute;
        font-size: 12px;
        top: 35px;
        left: 65px;
      }
    }

    .user-item:hover {
      transform: scale(1.1) translateZ(0);
    }
  }
}
</style>
