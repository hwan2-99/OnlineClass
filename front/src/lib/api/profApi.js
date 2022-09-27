const CREATE_API = "http://localhost:5000/";

const prof = {
  classOpen: (Info) => {
    return fetch(CREATE_API + "prof/class", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Info),
    });
  },

  getMyClassList: (num) => {
    return fetch(`${CREATE_API}prof/classlist/${num}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getAllClassList: () => {
    return fetch(CREATE_API + "prof/classlist", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getClassVideoList: (classnum) => {
    return fetch(CREATE_API + "prof/video/list/" + classnum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },
};

export default prof;
