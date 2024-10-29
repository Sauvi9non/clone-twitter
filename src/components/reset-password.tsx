import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Form, Input, Title, Wrapper, Error } from "./auth-component";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target:{name, value} } = e; //event에서 target을 가져온다.

        if(name === "useremail"){ //target의 name이 useremail이면
            setEmail(value); //setEmail에 target의 value를 넣는다.
    }
}
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => { //form태그가 제출될 때 실행
        e.preventDefault(); //화면이 새로고침되는 것을 막는다.
        setError("");

        await sendPasswordResetEmail(auth, email); //재설정 이메일 보내기
        setIsLoading(true);
    }
    

return <Wrapper>
<Title>Reset Password</Title>
<Form onSubmit={onSubmit}>
<Input name="useremail" value={email} placeholder="your email" type="email" onChange={onChange} required/> {/* Email */}
<Input type="submit" value={isLoading ? "Check your Email box" : "Send email"}/>
</Form>
{error !== "" ? <Error>{error}</Error> : null }
{isLoading ? <Link to="/login">로그인</Link> : null}
</Wrapper>
}