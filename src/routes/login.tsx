import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Wrapper, Title, Form, Input, Switcher, Error } from "../components/auth-component";
import GithubLogin from "../components/github-login";

export function Login() { //로그인 페이지
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { //input태그의 값이 변할 때마다 실행
        const { target:{name, value} } = e; //event에서 target을 가져온다.

        if(name === "useremail"){ //target의 name이 useremail이면
            setEmail(value); //setEmail에 target의 value를 넣는다.
        } else if(name === "password"){ //target의 name이 password이면
            setPassword(value); //setPassword에 target의 value를 넣는다
        }
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => { //form태그가 제출될 때 실행
        e.preventDefault(); //화면이 새로고침되는 것을 막는다.
        setError("");
        if( isLoading && email === "" || password === ""){ //name, email, password 중 하나라도 비어있으면
            return; //함수 종료
        }
        try{
            setIsLoading(true);
            //log in
            await signInWithEmailAndPassword(auth, email, password);
            //redirect to home
            navigate("/"); 
        } catch(e){ //사용자가 로그인에 실패했을 때 여기서 에러메시지 사용자에게 보여주기
            console.log(e);
            if(e instanceof FirebaseError){
                console.log(e.code, e.message);
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
        

        console.log(email, password); //입력한 값들을 콘솔에 출력
    }
    
    return (
    <Wrapper>
        <Title>Log in</Title>
        <Form onSubmit={onSubmit}>
        <Input name="useremail" value={email} placeholder="your email" type="email" onChange={onChange} required/> {/* Email */}
        <Input name="password" value={password} placeholder="password" type="password" onChange={onChange} required/> {/* PW */}
        <Input type="submit" value={isLoading ? "Log in..." : "Submit"}/> {/* 처음에는 false니까 계정 생성버튼이고, 버튼 누르면 true되니 계쩡 생성 로딩중 */}
        </Form>
        <Switcher>
          Are you new in here? <Link to="/create-account">Create Account</Link>
        </Switcher>
        <Switcher>
          <Link to="/reset-password">Forget Passoword?</Link>
        </Switcher>
        <GithubLogin />
        {error !== "" ? <Error>{error}</Error> : null }
    </Wrapper>
    )
  }

