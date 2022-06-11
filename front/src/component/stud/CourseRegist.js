const CourseRegist = (props) => {
  return (
    <>
      <ul>
        <li>강의명 {props.course_name}</li>
        <li>수용인원 {props.capacity}</li>
        <li>수강기간{props.course_term}</li>
        <button>강의 등록하기</button>
      </ul>
    </>
  );
};

export default CourseRegist;
