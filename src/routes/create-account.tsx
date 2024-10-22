import { styled } from "styled-components";
import React, { useState } from "react";

const Wrapper = styled.div`
    heigth: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding 50px 0px;,s
`;

const Title = styled.h1`
    font-size: 40px;
`;

const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 30px;
    border: none;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    text-align: center;

    &[type="submit"] { //type이 submit인 input태그
        cursor: pointer;
        &:hover { //hover일 때는
        opacity: 0.7;}
    }
`;

const Error = styled.span`
    color: #ff0000;
    font-size: 16px;
`;


export default function CreateAccount() { //계정 생성 페이지
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
        try{
            //create an account
            //set the user of the name on firebase
            //redirect to home
        } catch(e){
            //setError(e.message);
        } finally {
            setIsLoading(true); //로딩중으로 바꾼다.
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
        {error !== "" ? <Error>{error}</Error> : null }
    </Wrapper>
    )
  }

