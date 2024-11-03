import { styled } from "styled-components"
import { useState } from "react";

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
        const { files } = e.target;
        if (files && files.length === 1) { //file이 있고, 하나면
            setFile(files[0]);
        }

    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => { //폼이 제출될 때
        e.preventDefault();
        //tweeting
        setIsLoading(true);
    }

    return (
    <Form onSubmit={onSubmit}>
        <TextArea placeholder="What's going on?" rows = {5} maxLength={200} value={tweet} onChange={onChange}/>
        <AttachFileBtn htmlFor="file">{ file ? "Add File" : "File Added"}</AttachFileBtn>
        <AttachFileInput id="file" type="file" accept="image/*" onChange={onFileChange} />
        <Submit type="submit" value={isLoading ? "Posting..." : "Post Tweet"}></Submit>
    </Form>
    );
}