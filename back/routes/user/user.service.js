const pool = require("../../config/dbConfig");

module.exports = {
  insertUser: async (userInfo) => {
    try {
      const conn = await pool.getConnection();
    } catch (error) {
      return error;
    }
  },

  loginUser: async (userInfo) => {},
};
