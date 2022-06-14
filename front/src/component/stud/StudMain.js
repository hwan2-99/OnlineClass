import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import studHandler from "../../lib/handler/studHandler";

const StudMain = () => {
  const { classnum } = useParams();
  const navigater = useNavigate();

  const [loading, setLoading] = useState(false);
  const [videoList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await studHandler.getClassVideoList(classnum);
        setList(result);
      };

      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [classnum]);

  if (loading) {
    return (
      <div>
        <h1>로딩중</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>클래스 보기</h1>
        <hr />
        <div>
          {videoList.map((video) => {
            return (
              <div key={video.video_num}>
                <h3>강의 : {video.course_name}</h3>
                <p>제 {video.video_order} 강</p>
                <p>제목 : {video.video_title}</p>
                <p>
                  업로드 날짜 :{new Date(video.video_upload_date).toISOString()}
                </p>
                <Button
                  onClick={(e) => {
                    navigater(`${video.video_num}`, { state: video });
                  }}
                >
                  강의 시청하기
                </Button>
              </div>
            );
          })}
          <Outlet />
        </div>
      </div>
    );
  }
};

export default StudMain;
