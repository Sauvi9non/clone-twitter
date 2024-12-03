import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase";

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

const Photo = styled.img`
    width: 100%;
    heigt: 100%;
`

const Column = styled.div`
`;

const DeleteButton = styled.button`
    padding: 5px;
    margin: 5px;
    background-color: #ff0000;
    cursor: pointer;
    font-size: 16px;
    &:focus {
        outline: none;
    }
`;

const EditButton = styled.button`
    padding: 5px;
    margin: 5px;
    background-color: #00ff00;
    cursor: pointer;
    font-size: 16px;
    &:focus {
        outline: none;
    }
`;

export default function Tweet({username, tweet, userId, id, photo}:ITweet){
    const user = auth.currentUser;
    
    const onDelete = async () => {
        const check: boolean = confirm(`${id} ${userId} 트윗을 삭제하시겠습니까?`);
        if ( !check || user === null ||user.uid !== userId) return; //user가 null이거나 uid가 다르면 함수 종료
        try {
                await deleteDoc(doc(database,`tweets/${id}`));
        } catch(e) {
            console.log(e);
        } finally {
//
        }
    }

    const onEdit = async () => {
        const editedTweet: string | null = prompt("트윗 수정하기", tweet);
        if(editedTweet === null) return;
        await updateDoc(doc(database,`tweets/${id}`), {tweet: editedTweet});
    }
    return(
        <Wrapper>
            <Column>
            <Nickname>{username}</Nickname>
            <Payload>{tweet}</Payload>
            { !photo ? null : <Photo src={photo}></Photo>}
            <></>
            { user?.uid == userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
            { user?.uid == userId ? <EditButton onClick={onEdit}>Edit</EditButton> : null}
            </Column>
            {/**
             * if (photo)
             *  <Column><Photo src={file}></Photo></Column>
             * 나중에 파일 업로드 되는거 고치면 하기
             */}
             
        </Wrapper>
    );
}