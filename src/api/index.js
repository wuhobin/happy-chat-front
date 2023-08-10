import { post, postJSON, get } from "@/api/request";

export default {
  // 获取验证码
  GetLoginCode(params) {
    return post("/api/login/send", params);
  },
  UserLogin(params){
    return post("/api/login/mobile-login", params);
  },
  UploadImage(params){
    return post("/api/oss/upload", params);
  }
};
