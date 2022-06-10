import "./App.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import WritePost from "../pages/WritePost";

//라우트 v6 문법 사용!
//Switch ->Routes
//component -> element
//usehistory -> useNavigate

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/writepost" element={<WritePost />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  font-size: calc(10px + 2vmin);
`;
export default App;
