const pool = require("../../config/dbConfig");

module.exports = {
  videoUpload: async (videoInfo) => {
    //로컬에 저장

    //디비에 저장
    try {
      const conn = await pool.getConnection();
    } catch (error) {
      return error;
    }
  },
};
