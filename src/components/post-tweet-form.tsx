import { styled } from "styled-components"
import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 1px solid white;
    width:100%;
    height: 100px;
    resize: none;
    padding: 20px;
    font-size: 16pt;
    color: white; 
    background-color: #222222;
    &::placeholder {
        font-size: 16pt;
    }
    &:focus {
        border-color: #A5C8FF;
        outline: none;
    }
`;

const AttachFileBtn = styled.label` //이거 왜 label이지...
    padding: 10px 1px;
    border: 1px solid #A5C8FF;
    background-color: #222222;
    text-align: center;
    cursor: pointer;
    width: 100px;
    font-weight: 600;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const Submit = styled.input`
    padding: 10px 1px;
    border: none;
    background-color: #A5C8FF;
    text-align: center;
    cursor: pointer;
    width: 100px;
    font-weight: 600;
    font-size: 18px;
    &.hover,
    &.active {
        opacity: 0.9;
    }
`;

export default function PostTweetForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
        console.log(e);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        console.log(e);
        if (files && files.length === 1) { //file이 있고, 하나면
            setFile(files[0]);
            console.log(`파일 ${file}`);
        }
    }

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => { //폼이 제출될 때
        e.preventDefault();
        const user = auth.currentUser;
        //  이상한 트윗인지 확인
        if( user === null || isLoading || tweet.length > 200 || tweet === "") return ;

        try {
            setIsLoading(true); //비로소 Posting...으로 버튼이 바뀐다.
            const doc = await addDoc(collection(database,"tweets"),{ //트윗은 database에 저장
                tweet: tweet,
                createdAt: Date.now(),
                username: user.displayName || "Anonoymous",
                userId: user.uid,
            }); //어떤 컬렉션에 다큐먼트를 만들고 싶은지

            console.log(storage.app.options);
            
            if(file){ //파일이 있다면 storage에 저장 //업로드되는 파일의 폴더와 저장명 지정가능
                console.log(`파일 업로드 중 ${file}`);
                const fileRef = ref(storage,`tweets/${user.uid}-${user.displayName}/${doc.id}`);//파일의 레퍼렌스를 받고
                const result = await uploadBytes(fileRef,file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc,{photo: url});
                console.log(`파일 업로드 완료 ${file}`);
            }
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false);
            setTweet("");
            setFile(null);
        }
    }

    return (
    <Form onSubmit={onSubmit}>
        <TextArea required placeholder="What's going on?" rows = {5} maxLength={200} value={tweet} onChange={onChange}/>
        <AttachFileBtn htmlFor="file">{ file ? "File Added" : "Add File"}</AttachFileBtn>
        <AttachFileInput id="file" type="file" accept="image/*" onChange={onFileChange} />
        <Submit type="submit" value={isLoading ? "Posting..." : "Post Tweet"}></Submit>
    </Form>
    );
}