<template>
  <aside class="side-toolbar">
    <!-- <el-avatar
      :size="50"
      :src="avatarUrl"
      @click.native="showLoginBox"
    ></el-avatar> -->

    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:8081/api/oss/upload"
      ref="upload"
      :show-file-list="false"
      :headers="{ Token: getLoginToken() }"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :disabled="uploadEnabled"
    >
      <img :src="avatarUrl" class="avatar" @click="handleUploadClick" />
    </el-upload>

    <el-dialog
      title="快登录一起玩耍吧~"
      :visible.sync="dialogFormVisible"
      width="25%"
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
      avatarUrl: getUserInfo().avatar ? getUserInfo().avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  methods: {
    getLoginToken() {
      return getToken();
    },
    handleUploadClick() {
      this.showLoginBox();
    },
    handleAvatarSuccess(res, file) {
      const downloadUrl = res.data.downloadUrl;
      const userInfo = getUserInfo();
      userInfo.avatar = downloadUrl;
      setUserInfo(userInfo);
      this.avatarUrl = downloadUrl
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
                  setToken(data.token);
                  setUserInfo(this.userInfo);
                  this.$ws.send({
                    type: "message",
                    value: "登录成功",
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
  },
};
</script>

<style lang="less" scoped>
.side-toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 20px 0;
  color: #fff;
  user-select: none;

  .avatar-uploader .el-upload {
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 50px;
    height: 50px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    display: block;
    cursor: pointer;
    border-radius: 50%;
  }

  /deep/ .el-avatar {
    cursor: pointer;
  }

  /deep/ .el-dialog {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;

    .bottom-input {
      width: 60%;
    }

    .send-code {
      width: 30%;
      margin-left: 20px;
    }
  }

  /deep/ .el-form {
    width: 400px;
    padding: -20px 0;
  }

  .dialog-footer {
    .login-button {
      width: 100px;
    }
  }
}
</style>

<style>
.el-dialog__title {
  font-size: 16px;
}

.el-dialog__body {
  padding: 15px 20px 15px 0;
}
</style>
