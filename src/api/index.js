import { post, postJSON, get } from "@/api/request";

export default {
  getLoginQrCode(params) {
    return get("/api/wx/getLoginQrCode", params);
  },
};
