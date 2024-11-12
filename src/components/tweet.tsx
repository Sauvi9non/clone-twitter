import { styled } from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 20px;
    border: 1px solid white;
    padding: 20px;
    height: 100px;
`;

const Nickname = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

const Payload = styled.p`
    font-size: 16px;
    align-text: center;
    margin: 10px 0px;
`;

const Column = styled.div`
`;

export default function Tweet({username, tweet}:ITweet){
    return(
        <Wrapper>
            <Column><Nickname>{username}</Nickname></Column>
            <Column><Payload>{tweet}</Payload></Column>
            {/**
             * if (photo)
             *  <Column><Photo src={file}></Photo></Column>
             * 나중에 파일 업로드 되는거 고치면 하기
             */}
        </Wrapper>
    );
}