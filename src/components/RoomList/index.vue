<template>
  <div class="chat-message">
    <div
      v-for="(item, index) in roomList"
      :key="index"
      :class="['chat-message-item ', { active: activeChat === item.id }]"
      @click="activeChat = item.id"
    >
      <el-avatar shape="circle" :size="38" :src="item.avatar" />
      <div class="message-info">
        <div style="white-space: nowrap">
          <span class="person">{{ item.msgName }}</span>
          <span v-if="item.tag" class="tag">{{ item.tag }}</span>
        </div>
        <div class="message-message">
          {{ (item.name || "") + "：" + item.lastMsg }}
        </div>
      </div>
      <span class="message-time">{{ item.lastMsgTime }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RoomList",
  data() {
    return {
      activeChat: ref(1),
      roomList: [
        {
          id: 1,
          msgName: "通知",
          name: "机器人",
          avatar: "",
          tag: "机器人",
          lastMsg: "欢迎使用MallChat",
          lastMsgTime: "13:54",
        },
        {
          id: 2,
          msgName: "通知",
          name: "机器人",
          avatar: "",
          tag: "机器人",
          lastMsg: "欢迎使用MallChat",
          lastMsgTime: "13:54",
        },
      ],
    };
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped></style>
