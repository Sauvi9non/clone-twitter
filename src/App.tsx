import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";

function App() {

  const router = createBrowserRouter([ //변수로 배열을 전달 
    {
      path: "/",
      element: <Layout />,
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
    }
  ]);

  return (
    <>
      <h1>CLONE TWITTER</h1>
      <RouterProvider router={router} />
    </>
  )
}

export default App
