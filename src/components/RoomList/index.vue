<template>
  <div class="room-list">
    <div v-if="middleMsgType === 1">
      <div
        v-for="(item, index) in roomList"
        :class="['room-message ', { active: activeChat === item.id }]"
        :key="index"
        @click="handlerMsg(item)"
      >
        <el-avatar shape="square" :size="40" :src="item.avatar"></el-avatar>
        <div>
          <p class="room-name">{{ item.roomName }}</p>
          <p class="last-message">{{ item.lastMsg }}</p>
        </div>
        <span class="message-time">{{ item.lastMsgTime }}</span>
      </div>
    </div>

    <div class="friend-message"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

export default {
  name: "RoomList",
  data() {
    return {
      activeChat: "",
      roomList: [
        {
          id: 1,
          roomName: "愉聊All People",
          avatar: "http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg",
          lastMsg: "欢迎使用HappyChat",
          lastMsgTime: "13:54",
        },
        {
          id: 2,
          roomName: "愉聊All People",
          avatar: "http://image.wuhobin.top/chat/1691663394478wgFYNQIh.jpg",
          lastMsg: "111",
          lastMsgTime: "13:54",
        },
      ],
    };
  },
  computed: {
    ...mapState(["middleMsgType"]),
  },
  watch:{
    middleMsgType(){
      this.activeChat = ''
    }
  },
  methods: {
    handlerMsg(item) {
      this.activeChat = item.id;
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped></style>
