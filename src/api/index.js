import { post, postJSON, get } from "@/api/request";


export default {
    getWxLoginUrl(params) {
      return get("/api/wx/getLoginUrl", params);
    }
  };