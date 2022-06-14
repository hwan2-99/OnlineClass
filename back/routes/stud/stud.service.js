const pool = require("../../config/dbConfig");

module.exports = {
  classRegister: async (info) => {
    console.log(info);
    try {
      const conn = await pool.getConnection();

      const date = new Date();

      const { studentNum, course_num, prof_num } = info;

      const query = `Insert into course_info (
        stud_num,course_num, prof_num, start_date, prog_rate, last_date
      ) values (?,?,?,NOW(),0,NOW())`;

      const [{ affectedRows: result }] = await conn.query(query, [
        studentNum,
        course_num,
        prof_num,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  },

  getMyClassList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `select course.course_num, course.course_name, 
        course_info.start_date, course_info.prog_rate 
        from course_info
        inner join course
        on course.course_num = course_info.course_num 
        where course_info.stud_num = ?`;

      const [result] = await conn.query(query, [num]);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getClassVideoList: async (classNum) => {
    try {
      const conn = await pool.getConnection();

      const query = `select * from course 
        inner join video on video.course_num = course.course_num
        where video.course_num = ?`;

      const [result] = await conn.query(query, [classNum]);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
