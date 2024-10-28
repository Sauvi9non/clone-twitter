import { signOut } from "firebase/auth";
import {auth} from "../firebase";

export default function Home() {
    const logout = () => {
        signOut(auth);
    }
  return (
    <>
      <h1>Home</h1>
      <button onClick={logout}>로그아웃</button>
    </>
  )
}