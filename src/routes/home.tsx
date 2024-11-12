import PostTweetForm from "../components/post-tweet-form";
import { styled } from "styled-components";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll; //post tweet form은 고정, timeline만 스크롤
  grid-template-rows: 1fr 5fr; // CSS 마스터 클래스...grid 아직 잘 모르긴 하는데...

`;

export default function Home() {

  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}