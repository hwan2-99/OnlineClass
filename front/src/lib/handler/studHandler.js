import studApi from "../api/studApi";

const SUCCESS = 200;

const studHandler = {
  studClassRegister: async (info) => {
    try {
      let apiResult = await studApi.classRegister(info);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("register Fail");

      return false;
    }
  },

  getMyClassList: async (num) => {
    try {
      let apiResult = await studApi.studClassList(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getClassVideoList: async (num) => {
    try {
      let apiResult = await studApi.videoList(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getVideoTagList: async (num) => {
    try {
      let apiResult = await studApi.getVideoTag(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getTagFAQList: async (tagnum) => {
    try {
      let apiResult = await studApi.getTagFAQ(tagnum);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  postQAStud: async (info) => {
    try {
      let apiResult = await studApi.postQA(info);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("qa add Fail");

      return false;
    }
  },
};

export default studHandler;
