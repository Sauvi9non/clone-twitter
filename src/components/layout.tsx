import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
        <h2>Layout</h2>
        <Outlet />
    </>
  )
}


//Outlet은 라우터의 자식을 렌더링하는데 사용되는 컴포넌트입니다.
//주소 바뀔 때마다 Outlet 부분이 바뀌게 됩니다.