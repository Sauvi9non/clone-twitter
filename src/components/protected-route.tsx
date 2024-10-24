//로그인한 사용자만 볼 수 있음
//로그인하지 않은 사용자는 로그인 페이지로 리다이렉트 혹은 계정 생성
//ProtectedRoute 컴포넌트는 props로 children을 받는데, 이는 다른 컴포넌트를 감싸는 컴포넌트라는 뜻
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    //user가 로그인했니?
    const user = auth.currentUser;

    if (!user) {
        //로그인 안했으면 로그인 페이지로 리다이렉트
        return <Navigate to="/login" />;
    } else
    return ( children );
}
