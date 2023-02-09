![image](https://user-images.githubusercontent.com/40158148/217747133-53822e72-9252-46e6-8818-d31f0437c86c.png)
### interactive Online Class

---

**제작년도**  : 2022년 6월 - 11월

**프로젝트 1줄 설명**

- 온라인 강의에서 교수자-학습자 간 상호작용을 도와 주기 위한 Q&A를 강의실에서 동영상 섹션 부분마다 바로 볼 수 있게 설계

**사용스택**!
[image](https://user-images.githubusercontent.com/40158148/217747176-afd9dd84-f26f-490d-b880-307a4a70e88d.png)

---

**프론트**

- React.js

**백엔드**

- Node.js , Mysql

**설명**

- 직접 겪은 비대면 학습의 문제점을 해결하고자 아이디어를 선정하여 개발을 진행했습니다.
- 온라인 강의실 (LMS) 구현을 위해 다음과 같은 공부를 진행했습니다.
    - react-dropzone : 리액트에서 파일을 드래그해서 업로드할 수 있는 기능
        
        ```jsx
        <Dropzone
          onDrop={onDrop}
          multiple={false} //한번에 올리는 파일 갯수
          maxSize={100000000}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: "300px",
                height: "240px",
                border: "1px solid lightray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <Input {...getInputProps()} />
              <UploadOutlined type="plus" style={{ fontSize: "3rem" }} />
            </div>
          )}
        </Dropzone>
        ```
        
    - react-player : 리액트에서 커스텀 동영상 플레이어를 사용할 수 있는 기능
        
        ```jsx
        <ReactPlayer
        width="inherit"
        ref={videoRef}
        height="400px"
        url={`http://localhost:5000/stud/video/${video_filename}`}
        playing={videoState.playing}
        muted={videoState.muted}
        controls={videoState.controls}
        poster={"../../asset/asset/play"}
        volume={videoState.volume}
        light={true}
        onPause={pauseHandler}
        onProgress={onProgressHandler}
        />
        ```
        
    - multer.js : 노드에서 파일을 스트림 단위로 post 받을 수 있는 기능
        
        ```jsx
        router.post("/upload/video", async (req, res) => {
          const storage = multer.diskStorage({
            destination: (req, file, callback) => {
              callback(null, `uploads/video/`); //업로드 파일의 저장 위치를 설정
            },
            filename: (req, file, callback) => {
              callback(null, `${Date.now()}_${file.originalname}`); // 파일이 저장될 때 이름 설정
            },
          });
        
          const limits = {
            files: 1,
            fileSize: 1024 * 1024 * 1024, //1G
          };
        
          const upload = multer({ storage, limits }).any();
        
          const reqFiles = [];
        
          upload(req, res, (err) => {
            if (err) {
              console.log(err);
              return res.json({ success: false, err });
            }
        
            for (let i = 0; i < req.files.length; i++) {
              reqFiles.push(req.files[i].filename);
            }
        
            console.log(reqFiles);
        
            return res.json({
              success: true,
              status: 200,
              fileName: reqFiles[0],
            });
          });
        });
        ```
        
    - fs stream : 노드에서 동영상을 스트림단위로 전송하는 기능
        
        ```jsx
        router.get("/video/:fileName", (req, res) => {
          const { fileName } = req.params;
        
          const fullPath = `uploads/video/${fileName}.mp4`;
          const fileStat = fs.statSync(fullPath);
          const { size } = fileStat;
          const { range } = fileStat;
        
          // 범위에 대한 요청이 있을 경우
          if (range) {
            // bytes= 부분을 없애고 - 단위로 문자열을 자름
            const parts = range.replace(/bytes=/, "").split("-");
            // 시작 부분의 문자열을 정수형으로 변환
            const start = parseInt(parts[0]);
            // 끝 부분의 문자열을 정수형으로 변환 (끝 부분이 없으면 총 파일 사이즈에서 - 1)
            const end = parts[1] ? parseInt(parts[1]) : size - 1;
            // 내보낼 부분의 길이
            const chunk = end - start + 1;
            // 시작 부분과 끝 부분의 스트림을 읽음
            const stream = fs.createReadStream(fullPath, { start, end });
            // 응답
            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${size}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunk,
              "Content-Type": "video/mp4",
            });
            // 스트림을 내보냄
            stream.pipe(res);
          } else {
            // 범위에 대한 요청이 아님
            res.writeHead(200, {
              "Content-Length": size,
              "Content-Type": "video/mp4",
            });
            // 스트림을 만들고 응답에 실어보냄
            fs.createReadStream(fullPath).pipe(res);
          }
        });
        ```
        
    
- 졸업 작품, 학술 대회 참여, 관련 특허 진행을 했습니다.
    
    ![image](https://user-images.githubusercontent.com/40158148/217747231-f184d255-90b8-4044-acae-b576729f714b.png)
    
    [온라인 수업의 상호작용 향상을 위한 웹 기반 에듀테크 시스템의 설계 | DBpia](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11140582)
    

**시스템 구성도**

![리액트 컴포넌트 모듈 구성도](https://user-images.githubusercontent.com/40158148/217747284-368f474d-ef8e-45d0-a4d3-d770c4c1f187.png)

리액트 컴포넌트 모듈 구성도

![NODE REST 서버 라우트 구성도](https://user-images.githubusercontent.com/40158148/217747343-b4e35a86-deff-4330-90d8-fb8747af39f9.png)




NODE REST 서버 라우트 구성도

**사용자 화면**

![image](https://user-images.githubusercontent.com/40158148/217747430-82918e6d-82cc-4068-8c79-5d7e0e250f16.png)


교수자 강의실 관리 화면

1. 강좌 개설 버튼
2. 강좌업로드 버튼
3. 업로드 영상 FAQ 관리

![image](https://user-images.githubusercontent.com/40158148/217747465-9b48f000-dc5b-4a0e-8a3c-be2cbeb9333a.png)

학습자 강의실 화면 

1. 내가 듣는 강좌 목록
2. 강의실 영상 플레이어
3. 영상 FAQ 화면
4. 강의 영상 목록
