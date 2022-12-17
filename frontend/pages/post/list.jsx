import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"
import LoadingSpinner from "../../src/component/common/LoadingSpinner";
import PostCard from "../../src/component/post/Post-card";

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
`

export default function PostList() {
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);

    const apiurl = process.env.NEXT_PUBLIC_BACKEND;

    const getPostList = async () => {
        const url = apiurl + "/post/list";
        let data = await axios.post(url, {}, { withCredentials: true }).then(res => res.data)
        setPostList(data);
        setLoading(false);
    }
    useEffect(() => {
        getPostList();
    }, [])

    useEffect(() => {
        console.log(postList);
    }, [postList])

    return <>
        {
            loading ? <LoadingSpinner /> : (
                <Wrapper>
                    <PostListGrid>
                    {
                        postList.length > 0 && postList.map((item, idx)=>{
                            return (
                                <PostCard key={idx} item={item} />
                            )
                        })
                    }
                    </PostListGrid>
                </Wrapper>
            )
        }
    </>
}