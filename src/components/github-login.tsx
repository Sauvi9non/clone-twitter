import { GithubAuthProvider, signInWithPopup} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase.ts";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
    margin-top: 50px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10 20;
    gap: 5px;
    font-weight: 400;
    cursor: pointer;
`;

const Logo = styled.img`
    heigth: 25px;
`

export default function GithubLogin() {
    const navigate = useNavigate();

    const onClick = async() => {
        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider); 
            navigate("/");
        } catch(e) {
            // Handle Errors here.
            console.error(e);
          }
    }
    return <>
        <Button onClick={onClick}>
            <Logo src="../../public/github-mark.svg" />
            GitHub Login
        </Button>
    </>;
}