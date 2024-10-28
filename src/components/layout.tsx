import { Outlet, useNavigate } from "react-router-dom";
import {styled} from "styled-components";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Button = styled.button`
    background-color: #A5C8FF;
`;


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