const CREATE_API = "http://localhost:5000/";

const studApi = {
  classRegister: (info) => {
    return fetch(CREATE_API + "stud/register", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  studClassList: (num) => {
    return fetch(CREATE_API + "stud/class/" + num, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  videoList: (classnum) => {
    return fetch(CREATE_API + "stud/video/list/" + classnum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getVideoTag: (num) => {
    return fetch(CREATE_API + "stud/video/tag/" + num, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getTagFAQ: (tagNum) => {
    return fetch(CREATE_API + "stud/faq/" + tagNum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  postQA: (info) => {
    return fetch(CREATE_API + "stud/qa", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },
};
export default studApi;
