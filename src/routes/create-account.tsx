import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link, Form } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error } from "../components/auth-component";
import GithubLogin from "../components/github-login";


export default function CreateAccount() { //계정 생성 페이지
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { //input태그의 값이 변할 때마다 실행
        const { target:{name, value} } = e; //event에서 target을 가져온다.

        if(name === "username"){ //target의 name이 username이면  
            setName(value); //setName에 target의 value를 넣는다. 
        } else if(name === "useremail"){ //target의 name이 useremail이면
            setEmail(value); //setEmail에 target의 value를 넣는다.
        } else if(name === "password"){ //target의 name이 password이면
            setPassword(value); //setPassword에 target의 value를 넣는다
        }
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => { //form태그가 제출될 때 실행
        e.preventDefault(); //화면이 새로고침되는 것을 막는다.
        setError("");
        if( isLoading && name === "" || email === "" || password === ""){ //name, email, password 중 하나라도 비어있으면
            return; //함수 종료
        }
        setIsLoading(true);
        try{
            //create an account
            const credentials = await createUserWithEmailAndPassword(auth, email, password); //파이어베이스에 이메일과 비밀번호로 계정을 생성한다.
            console.log(credentials.user)
            //set the user of the name on firebase
            await updateProfile(credentials.user, {displayName: name}); //파이어베이스에 계정의 이름을 설정한다.
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
        

        console.log(name, email, password); //입력한 값들을 콘솔에 출력
    }
    
    return (
    <Wrapper>
        <Title>Create Clone Twitter Account</Title>
        <Form onSubmit={onSubmit}>
        <Input name="username" value={name} placeholder="your name" type="text" onChange={onChange} required/> {/* User Name */}
        <Input name="useremail" value={email} placeholder="your email" type="email" onChange={onChange} required/> {/* Email */}
        <Input name="password" value={password} placeholder="password" type="password" onChange={onChange} required/> {/* PW */}
        <Input type="submit" value={isLoading ? "Creating..." : "Submit"}/> {/* 처음에는 false니까 계정 생성버튼이고, 버튼 누르면 true되니 계쩡 생성 로딩중 */}
        </Form>
        <GithubLogin />
        <Switcher>
          Already have own account? <Link to="/login">Log in</Link>
        </Switcher>
        {error !== "" ? <Error>{error}</Error> : null }
    </Wrapper>
    )
  }

