import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { reduxAction } from "../../redux/redux-action"

const Wrapper = styled.div`
    display: relative;
    margin: 1rem;
    border: 1px solid grey;
    //padding: 1rem;
    border-radius: .5rem;
`

const Flex = styled.div`
    display: flex;
    position: relative;
    //width: 100%;
    align-items: center;
    gap: .5rem;
`

const Row = styled(Flex)`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid grey;
    justify-content: space-between;
`

const CommentImg = styled.img`
    width: 1rem;
    height: 1rem;
`

const AuthorEdit = styled.div`
    width: 200px;
    position: relative;
    //border: 1px solid grey;
`
const AuthorEditPlaceholder = styled.label`
    position: absolute;
    cursor: text;
    left: 1.7rem;
    top: 0px;
    color: grey;
`

const ContentEdit = styled(AuthorEdit)`
    position: relative;
    //border: 1px solid grey;
    min-height: 3rem;
    width: 100%;
`
const ContentEditPlaceholder = styled(AuthorEditPlaceholder)``
const PasswordEdit = styled.input`
    font-size: 1rem;
    border: 0;
`

const SubmitBtn = styled.div`
    border-left: 1px solid grey;
    padding: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    cursor: pointer;
    transition: .3s;
    font-weight: bold;
    &:hover{
        background-color: #e2e2e2;
    }
    border-radius: 0 0 .5rem 0rem;
`

export default function CommentEditor({post, commentView, setCommentView, setCommentToggle}){
    const [authorEditFocus, setAuthorEditFocus] = useState(false);
    const [contentEditFocus, setContentEditFocus] = useState(false);
    const authorEditRef = useRef();
    const contentEditRef = useRef();
    const dispatch = useDispatch();

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_BACKEND;

    const SubmitHndlr = async () => {
        if(!!!content){
            dispatch(reduxAction.ALERT({type: "error", msg : "댓글 내용을 입력해주세요.", show: true}))
        }
        else{
            if(!!!password){
                dispatch(reduxAction.ALERT({type: "error", msg : "비밀번호를 입력해야합니다.", show: true}))
            }
            else{
                let param = {
                    //post_id, is_reply, reply_comment_idx, author, author_ip, content, password
                    post_id: post.POST_ID,
                    is_reply: 'N',
                    reply_comment_idx : -1,
                    author: author,
                    content: content,
                    password: password,
                };
                let data = await axios.post(API_URL + `/comment/write`, param, {withCredentials: true}).then(res => res.data);
                setCommentView(!commentView);
                setCommentToggle(false);
            }
        }
    }

    useEffect(()=>{
        authorEditRef.current.focus();
    },[])
    return <Wrapper>
        <Row>
            <Flex>
                <CommentImg src="/image/user.png" />
                <AuthorEdit 
                    contentEditable 
                    suppressContentEditableWarning
                    onFocus={()=>{
                        setAuthorEditFocus(true);
                    }}
                    onBlur={(e)=>{
                        !!!e.target.innerText && setAuthorEditFocus(false);
                    }}
                    onKeyDown={(e)=>{
                        if(e.code === 'Enter'){
                            e.preventDefault(true);
                        }
                        if(e.target.innerText.length >= 20){
                            if(!(
                               e.code.search('Arrow') >= 0 
                            || e.code === 'Delete' 
                            || e.code === "Backspace"
                            || e.code === "Home"
                            || e.code === "End"
                            )){
                                e.preventDefault(true);
                            }
                        }
                    }}
                    onInput={(e)=>{
                        setAuthor(e.target.innerText);
                    }}
                    ref={authorEditRef}
                />
                {
                   !authorEditFocus && 
                   <AuthorEditPlaceholder onClick={()=>{authorEditRef.current.focus()}}>
                        작성자
                   </AuthorEditPlaceholder>
                }
            </Flex>
        </Row>
        <Row>
            <Flex style={{alignItems: 'start', width: "100%"}}>
                <CommentImg src="/image/comments.png" />
                <ContentEdit 
                    contentEditable
                    suppressContentEditableWarning
                    ref={contentEditRef}
                    onFocus={()=>{
                        setContentEditFocus(true);
                    }}
                    onBlur={(e)=>{
                        !!!e.target.innerText && setContentEditFocus(false);
                    }}
                    onKeyDown={(e)=>{                        
                        if(e.target.innerText.length >= 3000){
                            if(!(
                               e.code.search('Arrow') >= 0 
                            || e.code === 'Delete' 
                            || e.code === "Backspace"
                            || e.code === "Home"
                            || e.code === "End"
                            )){
                                e.preventDefault(true);
                            }
                        }
                    }}
                    onInput={(e)=>{
                        setContent(e.target.innerText);
                    }}
                />
                {
                   !contentEditFocus && 
                    <ContentEditPlaceholder onClick={()=>{contentEditRef.current.focus()}}>
                        댓글 내용
                    </ContentEditPlaceholder>
                }
            </Flex>
        </Row>
        <Row style={{padding: 0, paddingLeft: "1rem", borderBottom: 0}}>
            <Flex>
                <CommentImg src="/image/password.png" />
                <PasswordEdit 
                    type="password" 
                    placeholder="비밀번호"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
            </Flex>
            <SubmitBtn onClick={()=>{SubmitHndlr()}}>
                등록                
            </SubmitBtn>
        </Row>
    </Wrapper>
}