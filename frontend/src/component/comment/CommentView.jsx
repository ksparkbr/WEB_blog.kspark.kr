import axios from "axios"
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 1rem;
`

const CommentItem = styled.div`
    border-bottom: 1px solid grey;
    padding: 1rem;
`
const Flex = styled.div`
    display: flex;
    gap: .5rem;
`

const CommentAuthor = styled(Flex)`
    align-items: center;
    font-weight: bold;
`

const AuthorIP = styled.div`
    font-weight: normal!important;
    font-size: .8rem;
    color: grey;
`

const CommentContent = styled.div`
    font-size: .9rem;
`
const CommentImg = styled.img`
    width: 1rem;
    height: 1rem;
`

const CommentDate = styled.div`
    font-size: .9rem;
    color: grey;
`

export default function CommentView({post, toggle}){
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    const [commentList, setCommentList]= useState([]);
    const getCommentData = async ()=>{
        let data = await axios.get(API_URL + "/comment/load/" + post.POST_ID).then(res => res.data);
        setCommentList(data);
    }

    useEffect(()=>{
        getCommentData();
    },[toggle])

    return <Wrapper>
        {commentList.length > 0 && commentList.map((item, idx)=>{
            return (
                <CommentItem>
                    <CommentAuthor>
                        <CommentImg src="/image/user.png" />
                        <Flex style={{alignItems:"end"}}>
                            <div>
                                {item.author}
                            </div>
                            <AuthorIP>
                                ({item.author_ip})
                            </AuthorIP>
                        </Flex>
                    </CommentAuthor>
                    <CommentContent dangerouslySetInnerHTML={{__html : item.content.replace(/\n/gi, "<br>")}} />
                    <CommentDate>
                        {dateformat.format(new Date(item.comment_date))}
                    </CommentDate>
                </CommentItem>
            )
        })}        
    </Wrapper>
}