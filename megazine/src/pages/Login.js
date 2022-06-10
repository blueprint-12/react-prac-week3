import React from "react";
import styled from "styled-components";
//비밀번호 로그인 처리, 기본적으로 우리가 만든 auth도 가져와야 함, getAuth를 firebase.js에서 auth로 내보내고 있음
import { auth, db } from "../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

//아이디를 알 경우에는 getDoc사용해서 가져오면 되는데 우리는 아이디가 랜덤생성됨
//-> where절을 사용해서 이메일(고유값)과 지금 로그인한 유저의 이메일이 같은애를 가져오면된다.
import { collection, query, where, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  //async await 해야하는 이유 promise를 떨구니까(비동기처리라서?)
  //async await을 해야 user정보를 볼 수 있다.
  const loginFB = async () => {
    console.log("id " + id_ref.current.value, "pw " + pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );
    //user_docs의 데이터는 여러개로 온다 -> 배열 [] 로 온다함 , 근데 왜 map안되세요 ..흑흑
    console.log(user_docs);
    const usernameArr = [];
    user_docs.forEach((u) => usernameArr.push(u.data().name));
    let [username] = usernameArr;
    console.log(username);
    window.alert(`환영합니다😊 ${username}님!`);

    //라우터를 통해 Main으로 이동
    navigate("/");
  };
  return (
    <Container>
      <Contents>
        <InputBox>
          <label>아이디(이메일) : </label>
          <input ref={id_ref} required placeholder="example@email.com" />
        </InputBox>
        <InputBox>
          <label>비밀번호 : </label>
          <input
            ref={pw_ref}
            type="password"
            required
            minLength="6"
            placeholder="비밀번호 6자리 이상"
          />
        </InputBox>

        <button onClick={loginFB}>로그인</button>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  // 부모가 App이고 width가 데스크탑 기준 1000px으로 잡혀있음
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  gap: 1rem;
  flex-direction: column;
  width: 60%;
  display: flex;
`;
const InputBox = styled.div`
  text-align: left;
`;
export default Login;
