//Signup.js

import React from "react";
import { auth, db, storage } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const navigate = useNavigate();
  // const file_link_ref = React.useRef(null);

  const signupFB = async () => {
    // console.log(typeof id_val, typeof pw_val, typeof name_val);

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    //optional chaning-> ?. 삼항 연산자처럼 만약에 앞의 값이 유효하지 않으면 error를 반환하는 것이 아니라
    //undefined 값으로 넣어준다.
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current?.value,
      // image_url: file_link_ref.current?.url,
    });
    console.log(user_doc);
  };

  // const uploadFB = async (e) => {
  //   console.log(e.target.files[0]);
  //   const uploaded_file = await uploadBytes(
  //     ref(storage, `images/${e.target.files[0].name}`),
  //     e.target.files[0]
  //   );
  //   console.log(uploaded_file);

  //   const file_url = await getDownloadURL(uploaded_file.ref);
  //   file_link_ref.current = { url: file_url };
  //   //let file_url = file_link_ref.current.value.url 이랑 같은 거
  // };

  return (
    <div>
      아이디(이메일): <input ref={id_ref} required />
      <br />
      이름: <input ref={name_ref} required />
      <br />
      비밀번호: <input ref={pw_ref} type="password" required />
      <br />
      {/* 이미지 : <input type="file" onChange={uploadFB} /> <br /> */}
      <button
        onClick={() => {
          signupFB();
          window.alert("가입이 완료되었습니다.");
          navigate("/");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
