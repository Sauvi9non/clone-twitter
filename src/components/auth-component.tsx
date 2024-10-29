import styled from "styled-components";

export const Wrapper = styled.div`
    heigth: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding 50px 0px;,s
`;

export const Title = styled.h1`
    font-size: 40px;
`;

export const Form = styled.form`
    margin-top: 30px;
    maring-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
`;

export const Input = styled.input`
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

export const Error = styled.span`
    color: #ff0000;
    font-size: 16px;
`;

export const Switcher = styled.text`
      color: #A5C8FF;
      margin-top: 10px;
`;