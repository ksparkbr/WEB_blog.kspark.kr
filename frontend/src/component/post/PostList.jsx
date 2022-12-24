import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"
import LoadingSpinner from "../common/LoadingSpinner";
import PostCard from "./Post-card";

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const PostListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media screen and (min-width: 992px) and (max-width: 1199px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 992px) and (max-width: 1199px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 767px){
        grid-template-columns: repeat(1, 1fr);
    }
`

const TagInfo = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
`

const TagName = styled.span`
    margin-right: .5rem;
    margin-left: .5rem;
    color: #ff7f00;
    font-weight: bold;
    font-size: 2rem;
`

const TagCount = styled(TagName)`
    color: #0082ff;
`

export default function PostList({ tag }) {
    const [postList, setPostList] = useState([]);
    const session = useSelector(s => s.session);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const getPostList = async () => {
        const url = API_URL + "/post/list";
        let param = {
            session: session.session,
        }
        if (!!tag) param = { ...param, hashtag: tag };
        let data = await axios.post(url, param, { withCredentials: true }).then(res => res.data)
        setPostList(data);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        getPostList();
    }, [session, tag])

    useEffect(()=>{
        return(
            setPostList([])
        )
    },[])

    return <Wrapper>
        {
            loading ? <LoadingSpinner /> : (
                <>
                    {!!postList && postList.length > 1 ? (
                        <>
                            {!!tag && (
                                <>
                                    <TagInfo>
                                        <TagName>#{tag}</TagName>
                                        <span>검색결과</span>
                                        <TagCount>{postList.length}</TagCount>
                                        <span>건</span>
                                    </TagInfo>
                                </>
                            )}
                            <PostListGrid>
                                {
                                    postList.length > 0 && postList.map((item, idx) => {
                                        return (
                                            <PostCard key={idx} item={item} />
                                        )
                                    })
                                }
                            </PostListGrid>
                        </>
                    ) 
                    : postList.length <= 1 &&
                    <LoadingSpinner
                        onLoad={
                            session.admin ? router.push("/post/view/" + postList[0].POST_ID + "?session=" + session.session)
                                          : router.push("/post/view/" + postList[0].POST_ID)
                        }
                    />
                    }

                </>
            )
        }
    </Wrapper>

}