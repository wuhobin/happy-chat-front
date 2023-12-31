<template>
  <aside class="side-toolbar">
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:8081/api/oss/upload"
      ref="upload"
      :show-file-list="false"
      :headers="{ Token: getLoginToken() }"
      :data="{ userId: getUserId() }"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :disabled="uploadEnabled"
    >
      <img :src="avatarUrl" class="avatar" @click="handleUploadClick" />
    </el-upload>

    <div :class="['top ', { active: isChatActive }]" @click="clickChat">
      <img :src="require(`@/assets/images/chat-list.png`)" alt="" />
      <p>聊天</p>
    </div>

    <div :class="['top ', { active: isFriendActive }]" @click="clickFriend">
      <img :src="require(`@/assets/images/friend.png`)" alt="" />
      <p>好友</p>
    </div>

    <div class="tool-warp">
      <img
        v-for="(item, index) in toolList"
        :key="index"
        class="tool-user tool-image"
        :src="require(`@/assets/images/${item.image}`)"
        :title="item.title"
        :alt="item.title"
        @click="toolClick(item)"
      />
    </div>

    <el-dialog
      title="快登录一起玩耍吧~"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form
        :model="LoginFormParams"
        ref="loginForm"
        label-width="65px"
        :rules="rules"
      >
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="LoginFormParams.mobile"
            autocomplete="off"
            placeholder="请输入手机号"
            :maxlength="11"
            @input="handleMobileNumericInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            class="bottom-input"
            v-model="LoginFormParams.code"
            autocomplete="off"
            placeholder="请输入验证码"
            :maxlength="6"
            @input="handleCodeNumericInput"
          ></el-input>
          <el-button
            class="send-code"
            :disabled="ban"
            :loading="loading.sendCode"
            type="primary"
            @click="sendCode"
            >{{ time }}</el-button
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          class="login-button"
          :loading="loading.login"
          @click="handelLogin"
          >登录</el-button
        >
      </div>
    </el-dialog>
  </aside>
</template>

<script>
import { setToken, setUserInfo, getUserInfo, getToken } from "@/utils/auth";
import defaultAvatar from "@/assets/images/default-avatar.png";

export default {
  name: "ToolBar",
  data() {
    return {
      dialogFormVisible: false,
      LoginFormParams: {},
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.validatePhone, trigger: "blur" },
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      loading: {
        sendCode: false,
        login: false,
      },
      userInfo: {},
      uploadEnabled: true,
      ban: false,
      time: "获取",
      timeKey: true,
      avatarUrl: getUserInfo()
        ? getUserInfo().avatar
          ? getUserInfo().avatar
          : defaultAvatar
        : defaultAvatar,
      toolList: [
        { image: "tool-user.png", title: "在线用户", route: "/memberList" },
        { image: "friend-place.png", title: "朋友圈", route: "/memberList" },
      ],
      isChatActive: true,
      isFriendActive: false
    };
  },
  methods: {
    getLoginToken() {
      return getToken();
    },
    getUserId() {
      return getUserInfo() ? getUserInfo().id : null;
    },
    handleUploadClick() {
      this.showLoginBox();
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        const downloadUrl = res.data.downloadUrl;
        const userInfo = getUserInfo();
        userInfo.avatar = downloadUrl;
        setUserInfo(userInfo);
        this.avatarUrl = downloadUrl;
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeAvatarUpload() {},
    showLoginBox() {
      const userInfo = getUserInfo();
      if (userInfo) {
        if (!userInfo.avatar) {
          this.uploadEnabled = false;
          this.$refs.upload.submit();
        } else {
          this.uploadEnabled = true;
          if (this.$route.path !== "/userHome") {
            this.$router.push("/userHome");
          }
        }
      } else {
        this.uploadEnabled = true;
        this.LoginFormParams = {};
        this.dialogFormVisible = true;
        this.resetForm("loginForm");
      }
    },
    handelLogin() {
      this.UTILS.debounce(() => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading.login = true;
            this.$http
              .UserLogin({
                mobile: this.LoginFormParams.mobile,
                code: this.LoginFormParams.code,
              })
              .then((res) => {
                const { code, data, msg } = res;
                if (code === 200) {
                  this.userInfo = data.userVo;
                  this.loading.login = false;
                  this.dialogFormVisible = false;
                  this.avatarUrl = data.userVo.avatar
                    ? data.userVo.avatar
                    : defaultAvatar;
                  setToken(data.token);
                  setUserInfo(this.userInfo);
                  this.$ws.send({
                    type: 1,
                    data: {
                      userId: data.userVo.id,
                    },
                  });
                } else {
                  this.loading.login = false;
                  this.$message.error(msg);
                }
              })
              .catch(() => {
                this.loading.login = false;
                this.$message.error("登录失败！");
              });
          }
        });
      }, 2000);
    },
    sendCode() {
      if (!this.LoginFormParams.mobile) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!/^1\d{10}$/.test(this.LoginFormParams.mobile)) {
        this.$message.error("手机号格式错误");
        return;
      }
      if (!this.timeKey) return;
      this.timeKey = false;
      this.ban = true;
      this.loading.sendCode = true;
      this.$http.GetLoginCode({ mobile: this.LoginFormParams.mobile }).then(
        (response) => {
          this.loading.sendCode = false;
          let timeT = 60;
          if (response.code === 200) {
            this.$message({ message: "发送验证码成功", type: "success" });
            this.time = `${timeT}s`;
            const sTime = setInterval(() => {
              timeT--;
              this.time = `${timeT}s`;
              if (timeT < 0) {
                timeT = 0;
                this.time = "获取";
                clearInterval(sTime);
                this.timeKey = true;
                this.ban = false;
              }
            }, 1000);
          } else {
            this.$message.error(response.msg);
            this.timeKey = true;
            this.ban = false;
          }
        },
        (err) => {
          this.loading.sendCode = false;
          this.ban = false;
          this.$message.error("网络异常,请刷新重试");
          console.log(err);
        }
      );
    },
    validatePhone(rule, value, callback) {
      const reg = /^[1][3-9]\d{9}$/; // 手机号正则表达式
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    },
    handleCodeNumericInput() {
      this.LoginFormParams.code = this.LoginFormParams.code.replace(/\D/g, "");
    },
    handleMobileNumericInput() {
      this.LoginFormParams.mobile = this.LoginFormParams.mobile.replace(
        /\D/g,
        ""
      );
    },
    toolClick(item) {
      this.$router.push(item.route);
    },
    clickChat(){
      this.isFriendActive = false
      this.isChatActive = true;
      this.$store.commit('SET_MIDDLE_LIST_TYPE',1)
    },
    clickFriend(){
      this.isChatActive = false;
      this.isFriendActive = true
      this.$store.commit('SET_MIDDLE_LIST_TYPE',2)
    }
  },
};
</script>

<style lang="scss" src="./style.scss" scoped></style>

<style>
.el-dialog__title {
  font-size: 16px;
}

.el-dialog__body {
  padding: 15px 20px 15px 0;
}
</style>
