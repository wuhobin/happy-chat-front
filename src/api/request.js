import axios from "axios";
import qs from "qs";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/",
  timeout: 10000,
});

// http请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken(); // 从 localStorage 获取 Token
    if (token) {
      config.headers["token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http响应拦截器
service.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
      }
    }
    return Promise.reject(error);
  }
);

export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          token: sessionStorage.getItem("token"), // headers塞token
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
export function postJSON(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
