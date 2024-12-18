import { signOut } from "firebase/auth";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {styled} from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  heigth: 100%;
  width: 100%;
  max-width: 860px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-raidus: 50%;
  svg {
    fill: white;
    width: 30px;
  }
  &.logout {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onClick = () => {
    const ok = confirm("로그아웃 하시겠습니까?"); //boolean 반환
    if(ok) {
      signOut(auth);
      navigate("/login");
    }
  }
  return (
    <Wrapper>
        <Menu>
          <MenuItem>
          <Link to="/">
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
</svg>
          </Link>
          </MenuItem>
          <MenuItem>
          <Link to="/profile">
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" />
</svg>
          </Link>
          </MenuItem>
          <MenuItem className="logout" onClick={onClick}>
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" />
  <path clipRule="evenodd" fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" />
</svg>
          </MenuItem>
        </Menu>
        <Outlet />
    </Wrapper>
  )
}


//Outlet은 라우터의 자식을 렌더링하는데 사용되는 컴포넌트입니다.
//주소 바뀔 때마다 Outlet 부분이 바뀌게 됩니다.