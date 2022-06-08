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

  insertClass: async (classInfo) => {
    console.log(classInfo);
    //디비
    try {
      const conn = await pool.getConnection();

      const { course_name, capacity, course_term, course_content, num } =
        classInfo;

      const query = `Insert into course (
        prof_num,course_name, capacity, course_term,course_content
      ) values (?,?,?,?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        num,
        course_name,
        capacity,
        course_term,
        course_content,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  },
  getClassList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course where prof_num = ?`;

      const [result] = await conn.query(query, [num]);

      return result;
    } catch (error) {
      return error;
    }
  },
};
