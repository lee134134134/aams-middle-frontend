import axios from "./axios.js";
import axios_score from "./axios_score.js";
import axios_dangermsg from './axios_dangermsg.js'
import axios_sys from "./system_axios.js";
import qs from "qs";

const $http = {
  // get
  get(url: string, params={}, callback: any) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  get_score(url: string, params: any, callback: any) {
    return new Promise((resolve, reject) => {
      axios_score
        .get(url, {
          params: params,
        })
        .then((res) => {
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  get_sys(url: string, params={}, callback: any) {
    return new Promise((resolve, reject) => {
      axios_sys
        .get(url, {
          params: params,
        })
        .then((res) => {
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // post
  post (url: string, params={}, callback: any) {
    return new Promise( async (resolve, reject) => {
      const startTime = Date.parse(new Date());
    await  axios
        .post(url, params)
        .then((res) => {
          const endTime = Date.parse(new Date());
          if (endTime - startTime == 0) {
            setTimeout(() => {
              callback ? resolve(callback(res)) : resolve(res);
            }, 320);
            return;
          }
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post_score (url: string, params: any, callback: any) {
    return new Promise( async (resolve, reject) => {
      const startTime = Date.parse(new Date());
    await   axios_score
        .post(url, params)
        .then((res) => {
          const endTime = Date.parse(new Date());
          if (endTime - startTime == 0) {
            setTimeout(() => {
              callback ? resolve(callback(res)) : resolve(res);
            }, 320);
            return;
          }
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  postParams (url: string, params: any, callback: any) {
    return new Promise( async (resolve, reject) => {
      const startTime = Date.parse(new Date());
	  let form = new FormData()
	  form.append('id', params.id)
    await  axios
        .post(url, form)
        .then((res) => {
          const endTime = Date.parse(new Date());
          if (endTime - startTime == 0) {
            setTimeout(() => {
              callback ? resolve(callback(res)) : resolve(res);
            }, 320);
            return;
          }
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post_dangermsg (url: string, params: any, callback: any) {
    return new Promise( async (resolve, reject) => {
      const startTime = Date.parse(new Date());
    await   axios_dangermsg
        .post(url, params)
        .then((res) => {
          const endTime = Date.parse(new Date());
          if (endTime - startTime == 0) {
            setTimeout(() => {
              callback ? resolve(callback(res)) : resolve(res);
            }, 320);
            return;
          }
          callback ? resolve(callback(res)) : resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // put
  put(url: string, params: any, callback: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, {
          headers: {
            "content-type": "multipart/form-data",
          },
          data: params,
        })
        .then(
          (res) => {
            callback ? resolve(callback(res)) : resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

};
export default $http;
