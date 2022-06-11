import prof from "../api/profApi";

const SUCCESS = 200;
const FAIL = 500;

const profHandler = {
  classPost: async (Info) => {
    try {
      let apiResult = await prof.classOpen(Info);

      const result = apiResult;

      return result;
    } catch (error) {
      console.log("Fail");
      console.log(error);

      return false;
    }
  },

  getClassList: async (num) => {
    try {
      let apiResult = await prof.getMyClassList(num);
      const result = await apiResult.json();
      console.log(result);

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getRegisterableClass: async () => {
    try {
      let apiResult = await prof.getAllClassList();
      const result = await apiResult.json();
      console.log(result);

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default profHandler;
