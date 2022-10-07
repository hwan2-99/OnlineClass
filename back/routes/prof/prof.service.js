const pool = require("../../config/dbConfig");
const multer = require("multer");

module.exports = {
  videoUpload: async (videoInfo) => {
    //서버에 저장
    console.log(videoInfo);

    //디비에 저장
    try {
      const conn = await pool.getConnection();
    } catch (error) {
      return error;
    }
  },

  insertVideoInfo: async (videoInfo) => {
    try {
      const conn = await pool.getConnection();

      const { course_num, profnum, fileName, video_title, video_order } =
        videoInfo;

      const query = `Insert into video (
        course_num, prof_num, video_filename, video_upload_date, video_title, video_order
      ) values (?,?,?,NOW(),?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        course_num,
        profnum,
        fileName,
        video_title,
        video_order,
      ]);
      conn.release();
      return result;
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
      conn.release();
      return result;
    } catch (error) {
      return error;
    }
  },

  getClassInfo: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course where course_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getProfClassList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course where prof_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getAllClassList: async () => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course`;

      const [result] = await conn.query(query);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getMyVideoInfo: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from video where course_num=${num}`;

      const [result] = await conn.query(query);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
