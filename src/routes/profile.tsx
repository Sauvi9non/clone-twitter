import { styled } from "styled-components";
import { auth, storage, database } from "../firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  align-center: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  background-color: #A5C8FF;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarImg = styled.img`
  width : 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const UserName = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;;
`;

const UserEmail = styled.span`
  font-size: 18px;
`;

const MyTweet = styled.div`
  border: 2px solid #A5C8FF;
  padding: 20px;
  margin: 30px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const EditButton = styled.button`
  width: 24px;
  padding: 1px;
  opacity: 100;
  border-radius: 50px;
  cursor: pointer;

.svg {
  fill: white;
  maring: 0;
  width: 100%;
}
  &focus {
    outline: none;

  }
`;

export default function Profile() {
  const user = auth.currentUser;
  const defaultImg = "src/assets/array.jpg";
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [myTweets, setMyTweets] = useState<ITweet[]>([]);

  //useEffect로 tweetFetch

  useEffect(()=>{
    const fetchMyTweet = async () => {
      const tweetQuery = query( //이거 sql마냥... 그거군....
        collection(database, "tweets"), 
        where("userId", "==", user?.uid),
        orderBy("createdAt","desc"),
        limit(25)
      );
      const snapshot = await getDocs(tweetQuery);
      const myTweets = snapshot.docs.map((doc)=>{
        const {tweet, createdAt, userId, username} = doc.data();
        return {tweet, createdAt,userId, username, id:doc.id}
      });
      setMyTweets(myTweets);
    }
    fetchMyTweet();
  },[]);

  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (user === null) return;
    if(files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage,`avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      await updateProfile(user, {photoURL: avatarUrl});
      setAvatar(avatarUrl);
    }
  }

  const onClick = async () => {
    if (!user) return;
    const newDisplayName = prompt("변경할 닉네임을 입력하세요");
    //const nameRef = doc(database, `tweets` );
    //await updateDoc(nameRef, {username: newDisplayName}); //기존 트윗들 데이터 변경
    await updateProfile(user, { //사용자 프로필 변경
      displayName: newDisplayName
    })
  }

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        { <AvatarImg src={avatar ? avatar : defaultImg} />}
      </AvatarUpload> {/** Input에 id를 주어야 label과 연결이 가능 */}
      <AvatarInput id="avatar" type="file" accept="image/*" onChange={onAvatarChange}></AvatarInput>
      
      <Name>
      <UserName>{user?.displayName}</UserName>
      <EditButton onClick={onClick}>
      <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
</svg>
      </EditButton>
      </Name>

      <UserEmail>{user?.email}</UserEmail>

      <MyTweet>
        {
          myTweets.map((myTweet)=>{
            return <Tweet {...myTweet} key={myTweet.id}/>
          })
        }
      </MyTweet>


    </Wrapper>
  )
}