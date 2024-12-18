import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import { Login } from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import styled from "styled-components";
import ProtectedRoute from "./components/protected-route";
import ResetPassword from "./components/reset-password";

const router = createBrowserRouter([ //변수로 배열을 전달 
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path:"",
        element: <Home />, // 주소가 / 일때 Home 컴포넌트를 렌더링
      },
      {
        path:"profile",
        element: <Profile />, // 주소가 /profile 일때 Profile 컴포넌트를 렌더링
      },
    ]
  },
  {
    path: "/login", //로그인 페이지와 계정 생성은 따로...
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  }
]);

const GlobalStyles = createGlobalStyle` // 전역 스타일 설정
${reset};
//이제 여기에 전역 스타일 설정하기
* {
  box-sizing: border-box;
  border-radius: 30px;
  },
body {
  background-color: #222222; //grey
  color: #ffffff; //white
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
},

`

const Wrapper = styled.div`
  heigth: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {

  const [isLoading, setIsLoading] = useState(true);

  const init = async() => {
    //wait for firebase
    await auth.authStateReady(); //파이어베이스가 준비될 때까지 기다림. 최초 인증 상태가 완료될 때 실행되는 Promise를 반환
    setTimeout(()=>setIsLoading(false), 3000);
  }

  useEffect(()=>{ //웹페이지가 일단 로드되면 실행
    init(); //async 함수 실행로 파이어베이스에서 사용자 로그인 체크
  },[]);

  return (
    <Wrapper>
      <GlobalStyles />
      <h1>CLONE TWITTER</h1>
      {/* isLoading이 true이면 LoadingScreen을 렌더링하고, false이면 RouterProvider를 렌더링 */}
      { isLoading ? <LoadingScreen /> : <RouterProvider router={router} /> }  
    </Wrapper>
  )
}

export default App
