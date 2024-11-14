import { styled } from "styled-components";
import { auth, storage, database } from "../firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

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

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        { <AvatarImg src={avatar ? avatar : defaultImg} />}
      </AvatarUpload> {/** Input에 id를 주어야 label과 연결이 가능 */}
      <AvatarInput id="avatar" type="file" accept="image/*" onChange={onAvatarChange}></AvatarInput>
      <UserName>{user?.displayName}</UserName>
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