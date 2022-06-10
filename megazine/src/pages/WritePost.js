import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
//리덕스로만 해보기
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../redux/modules/post";

import styled from "styled-components";

const Posting = () => {
  const navigate = useNavigate();
  const param = useParams();
  const file_link_ref = React.useRef(null);
  const commnet_ref = React.useRef(null);

  //리덕스에서 데이터 가져오기(useSelector)
  const data = useSelector((state) => state);
  console.log(data);
  const dispatch = useDispatch();

  const uploadFB = async (e) => {
    // console.log(e.target.files[0]);

    //Storage에 이미지 파일 예쁘게 들어가게 하기
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    // console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);
    file_link_ref.current = { url: file_url };
    //let file_url = file_link_ref.current.value.url 이랑 같은 거
  };

  const posting_docFB = async (e) => {
    e.preventDefault();
    // console.log(file_link_ref);
    // console.log(file_link_ref.current?.url, commnet_ref.current?.value);
    const image_doc = await addDoc(collection(db, "images"), {
      image_url: file_link_ref.current?.url,
      comment: commnet_ref.current?.value,
    });
  };

  return (
    <TopCont
      onSubmit={() => {
        // posting_docFB();
        dispatch(
          createPost({
            content: commnet_ref.current.value,
            image_url:
              "https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/what-sounds-do-happy-cats-make.jpg?h=636&la=en&w=1000&hash=2F0BB9450E4AE626B574D3FF7EC54A51A4872C94",
          })
        );
        window.alert("등록완료!");
        navigate("/");
      }}
    >
      <TextCont>
        <label htmlFor="text">텍스트 입력</label>
        <textarea id="text" ref={commnet_ref}></textarea>
      </TextCont>
      <FileCont>
        <label htmlFor="file">등록할 파일 : </label>
        <input type="file" id="file" onChange={uploadFB} />
      </FileCont>
      <Btn>등록하기</Btn>
    </TopCont>
  );
};
const TopCont = styled.form`
  font-size: 1.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #eee;
  padding: 20px;
  align-items: center;
`;
const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 10px;

  & > textarea {
    min-width: 70vmin;
    min-height: 150px;
    outline: none;
    border: 2px solid #535252;
    transition: 0.3s;
    border-radius: 5px;

    &:focus {
      border: 2px solid antiquewhite;
    }
  }
`;

const FileCont = styled.div`
  display: flex;
  min-width: 60%;
  justify-content: center;
  align-items: baseline;
`;

const Btn = styled.button`
  width: 30%;
`;
export default Posting;
