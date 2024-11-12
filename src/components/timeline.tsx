import { collection,getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { database } from "../firebase";
import Tweet from "./tweet";



export interface ITweet { //type은 firestore에서 확인. 
    //photo?: string | null;
    createdAt: number;
    tweet: string;
    userId: string; 
    username: string;
    id: string;
}

const Wrapper = styled.div`


`;

export default function Timeline(){
    const [ tweets, setTweets ] = useState<ITweet[]>([]);

    const fetchTweets = async () => {
        const tweetsQuery = query( //어떤 트윗을 원하는지 쿼리를 만들어야함
            collection(database, "tweets"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(tweetsQuery);//결과값으로 QuerySnapshot반환
        console.log(` 스냅숏 ${snapshot.docs}`);

        const tweets = snapshot.docs.map(doc => { //docs에서 값 추출해서 객체로 만들기.
            const { tweet, userId, username, createdAt } = doc.data(); //photo는 나중에...
            return {
                tweet, userId, username, createdAt,
                id: doc.id, //트윗의 아이디는 위에 것들이랑 같이 있지 않고 document에 있기 때문에 이렇게 따로....
            }
        });
 
        setTweets(tweets);
    }

    useEffect(()=>{
        fetchTweets();
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