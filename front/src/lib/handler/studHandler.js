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
};

export default studHandler;
