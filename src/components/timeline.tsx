/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { database } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";



export interface ITweet { //type은 firestore에서 확인. 
    //photo?: string | null;
    createdAt: number;
    tweet: string;
    userId: string; 
    username: string;
    id: string;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;

`;

export default function Timeline(){
    const [ tweets, setTweets ] = useState<ITweet[]>([]);

    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query( //어떤 트윗을 원하는지 쿼리를 만들어야함
                collection(database, "tweets"),
                orderBy("createdAt", "desc"), // 비용 절감을 위해 쿼리 제한할 수 있다. n억개 트윗 다 갖고 올거 아니잖아
                limit(25)
            );
            // const snapshot = await getDocs(tweetsQuery);//결과값으로 QuerySnapshot반환
            // console.log(` 스냅숏 ${snapshot.docs}`);
    
            // const tweets = snapshot.docs.map(doc => { //docs에서 값 추출해서 객체로 만들기.
            //     const { tweet, userId, username, createdAt } = doc.data(); //photo는 나중에...
            //     return {
            //         tweet, userId, username, createdAt,
            //         id: doc.id, //트윗의 아이디는 위에 것들이랑 같이 있지 않고 document에 있기 때문에 이렇게 따로....
            //     }
            // });
            
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => { //마운트 될 때 구독
                const tweets = snapshot.docs.map(doc => {//docs에서 값 추출해서 객체로 만들기.
                     const { tweet, userId, username, createdAt } = doc.data(); //photo는 나중에...
                     return {
                         tweet, userId, username, createdAt,
                         id: doc.id, //트윗의 아이디는 위에 것들이랑 같이 있지 않고 document에 있기 때문에 이렇게 따로....
                     }
                 });
                 setTweets(tweets);
            }); //데이터베이스랑 실시간 연결 Attaches a listener for DocumentSnapshot events
                //setTweets(tweets);
        }
        fetchTweets(); //여기서 
        return () => { //이런 문법이 있었나 언마운트될때 구취 useEffect 훅의 tear down Ehsms cleanup 기능?
            unsubscribe && unsubscribe(); //useEffect 훅은 타임라인 컴포넌트가 사용되지 않을 때 이 함수 호출
        }//왜냐하면 유저가 로그아웃 했거나 다른 화면에 있을 때 굳이 이벤트를 들을 필요가 없기 때문에
    }, []);

    return(
        <Wrapper>
            {tweets.map((tweet) => {
                return (
                    <Tweet key={tweet.id} {...tweet} />
                );
            })}
        </Wrapper>
    );
}