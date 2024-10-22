import { styled } from "styled-components";

//스타일 정의
const Wrapper = styled.div`
//가운데 정렬
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100%;

    background-color: #A5C8FF;
`;

const Text = styled.span`
    color: white;
    font-size: 20px;
`;

export default function LoadingScreen(){
    return (
        <Wrapper>
            <Text>
                Loading...
            </Text>
        </Wrapper>
    )
}