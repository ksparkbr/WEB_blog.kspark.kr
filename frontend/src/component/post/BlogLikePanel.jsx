import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reduxAction } from "../../redux/redux-action";


const Wrapper = styled.div`
    cursor: pointer;
`
const RoundPanel = styled.div`

    display: inline-block;
    border: 1px solid grey;
    border-radius: 40px;
    padding: .5rem;
    padding-left : 1rem;
    background-color: rgba(255,255,255,70%)
    
`

const LikeImg = styled.img`
    width: 1.5rem;
    cursor: pointer;
`

const LikeCount = styled.span`
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
`

const Flex = styled.div`
    display: flex;
`
const BlogLikePanel = ({ postId }) => {

    const [likeInfo, setLikeInfo] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const dispatch = useDispatch();

    const likeHndlr = async () => {
        if (postId != undefined) {
            let data = await axios.get(API_URL + "/post/like/" + postId).then(res => res.data);
            await getLikeInfo();
            dispatch(reduxAction.ALERT({type: "info", msg:"게시글에 공감하기를 눌렀습니다.", show : true}))
        }
    }

    const likeCancelHndlr = async () => {
        if (postId != undefined) {
            let data = await axios.get(API_URL + "/post/like/cancel/" + postId).then(res => res.data);
            await getLikeInfo();
            dispatch(reduxAction.ALERT({type: "error", msg:"게시글 공감을 취소했습니다.", show : true}))
        }
    }

    const getLikeInfo = async () => {
        let data = await axios.get(API_URL + "/post/like/status/" + postId).then(res => res.data);
        if (data.length > 0) {
            setLikeInfo(data);
        }
    }

    useEffect(() => {
        getLikeInfo();
    }, [postId])

    return <>
        <Wrapper onClick={() => {
                            if (likeInfo[0].CHECKED == 0) likeHndlr();
                            else likeCancelHndlr();
                        }}>
            <RoundPanel>
                <Flex>
                    <LikeImg
                        src={
                            likeInfo != undefined &&
                                likeInfo.length > 0 &&
                                likeInfo[0].CHECKED > 0 ?
                                "/image/like-on.png" : "/image/like-off.png"
                        }
                    />
                    {
                        likeInfo != undefined && likeInfo.length > 0 && <LikeCount>
                            {likeInfo[0].LIKE_COUNT}
                        </LikeCount>
                    }
                </Flex>
            </RoundPanel>
        </Wrapper>
    </>
}

export default BlogLikePanel;