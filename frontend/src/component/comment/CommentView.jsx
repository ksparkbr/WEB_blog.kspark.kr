import axios from "axios"
import { useEffect, useState } from "react";
import styled from "styled-components";
import {bcryptjs} from "bcryptjs";
import CommentItem from "./CommentItem";

const Wrapper = styled.div`
    margin: 1rem;
    border-top: 1px solid #e2e2e2;
    border-bottom: 2px solid #e2e2e2;
`


export default function CommentView({post, toggle, setToggle}){
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const [commentList, setCommentList]= useState([]);
 
    const getCommentData = async ()=>{
        let data = await axios.get(API_URL + "/comment/load/" + post.POST_ID).then(res => res.data);
        setCommentList(data);
    }

    useEffect(()=>{
        getCommentData();
    },[toggle])

    return commentList.length > 0 && <Wrapper>
        {commentList.length > 0 && commentList.map((item, idx)=>{
            return (
                <CommentItem item={item} key={idx} toggle={toggle} setToggle={setToggle} />
            )
        })}        
    </Wrapper>
}