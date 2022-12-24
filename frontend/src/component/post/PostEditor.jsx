import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reduxAction } from '../../redux/redux-action';

const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link', 'code-block'],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
            ['image', 'video'],
            ['clean']
        ],
    },
}

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    background-color: white;
    padding: 1rem;
    box-shadow: 5px 5px 6px 0px rgba(0,0,0,30%);
    margin-bottom: 1rem;
    border-radius: 1rem 1rem 1rem 1rem;
    & hr{
        margin-top: 1rem;
        border: 1px solid #eeeeee;
    }
`

const TitleWrapper = styled.div`

`
const TitleInput = styled.input`
    width: 100%;
    border: 0;
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    color: black;
    background-color: #eee;
    border-radius: 1rem;
`

const OptionPanel = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 1rem;
    & label{
        font-weight: bold;
    }
`
const CheckGroup = styled.div`
    display: flex;
    gap: .3rem;
    align-items: center;
`

const ControlBtnGroup = styled.div`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 1rem;
    width: 100%;
    gap: .5rem;
`

const SubmitBtn = styled.div`
    margin: 0;
    gap: .2rem;
    transition: .3s;
    display: flex;
    justify-content: center;
    align-items: center;
    & img{
        width: 1.1rem;
        height: 1.1rem;
    }
    &:hover{
        background-color: #272727;
    }
    color: white;
    background-color: black;
    width: 100px;
    padding: .5rem 1rem .5rem 1rem;
    border-radius: 2rem;
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,30%);
    cursor: pointer;
`

const ArrowBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #dcdcdc99;
    border-radius: 2.5rem;
    box-shadow: 2px 2px 3px 0px rgba(0,0,0,.3);
    transition:.3s;
    margin-right: .5rem;
    & img{
        width: 1rem;
    }
    &:hover{
        background-color: rgba(60,60,60,.3);
        box-shadow: 2px 2px 3px 0px rgba(0,0,0,.5);
    }
    cursor: pointer;
`

const Flex = styled.div`
    display: flex;
    gap: .2rem;
`

const CheckBox = styled.input``

export default function PostEditor({ mode, post }) {
    const session = useSelector(s=>s.session);
    const [htmlContent, setHtmlContent] = useState();    //본문
    const [titleContent, setTitleContent] = useState();  //제목
    const [writemode, setWritemode] = useState(false);   //비공개여부
    const [exposeMain, setExposeMain] = useState(true);  //메인공개여부
    const dispatch = useDispatch();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const FILE_SERVER_URL = process.env.NEXT_PUBLIC_FILESERVER;
    const router = useRouter();
    const chkWriteMode = useRef();
    const chkExposeMain = useRef();
    const titleInput = useRef();

    const arrowUpHndlr = () => {
        window.scrollTo(0, 0);
    }
    const arrowDownHndlr = () => {
        window.scrollTo(0, document.documentElement.offsetHeight);
    }

    useEffect(()=>{
        if(mode === "new") chkExposeMain.current.checked = true;
        else{
            setTitleContent(post.TITLE);
            setHtmlContent(post.CONTENT);
            setWritemode(post.WRITE_MODE === "private");
            setExposeMain(post.SHOW_MAIN === "Y")
            titleInput.current.value = post.TITLE;
            chkWriteMode.current.checked = post.WRITE_MODE === "private";
            chkExposeMain.current.checked = post.SHOW_MAIN === "Y";
        }
    },[])

    const submitHndlr = async ()=>{
        // summary, thumbnail, hashtags를 여기에서 추출한다.
        let tmpdom = document.createElement("div");
        tmpdom.innerHTML = htmlContent;
        let summary = tmpdom.innerText.trim().substring(0, 51);

        // 작성한 글 내의 모든 img 태그를 추출하여 imageList라는 배열로 만든다.
        let imageList = [...new Set(tmpdom.querySelectorAll('img'))].map(item => item.src)
        let _htmlContent = htmlContent;

        //이미지가 포함되어있지 않은경우 기본 썸네일은 아바타 이미지다.
        let thumbnail = '/image/avatar.png';

        if(imageList.length > 0){
            // 추출한 이미지의 Base64 데이터를 서버로 보내서 모두 업로드 처리한다.
            let imagePath = await axios.post(FILE_SERVER_URL + "/file/image/upload", { images: imageList }).then(res => res.data)
            if (imagePath.length > 0) {
                imagePath.forEach((item, idx) => {
                    if(item != null){
                        // 업로드한 Image의 URL을 응답받으면 기존 Base64 데이터를 replace 한다.
                        let imageUrl = FILE_SERVER_URL + "/file/image/view/" + item;
                        _htmlContent = _htmlContent.replace(imageList[idx], imageUrl)
                    }
                })
            }
        }

        //썸네일 추출 - 작성한 글의 제일 첫번째 포함된 img 태그의 src를 참조한다.
        tmpdom.innerHTML = _htmlContent;
        try{
            thumbnail = tmpdom.querySelector("img").src;
        }
        catch(e){};

        let hashTags = [...new Set(tmpdom.innerHTML.match(/#[^\s\<#\?\&]+/gi))]
        let param = {
            //title, content, summary, thumbnail, hashtags, showmain, writemode, session_id
            title: titleContent == undefined ? "제목 없음" : titleContent,
            content: htmlContent == undefined ? "" : _htmlContent,
            summary: summary == undefined ? "" : summary,
            thumbnail: thumbnail == undefined ? "" : thumbnail,
            hashtags : hashTags.length == 0 ? ['#미분류'] : hashTags,
            showmain : exposeMain ? "Y" : "N",
            writemode : writemode ? "private" : "public",
            session : session.session
        }
        
        if(session.admin){
            if(mode == "new"){
                let writeResult = await axios.post(API_URL + "/post/write", param, {withCredentials: true})
                dispatch(reduxAction.ALERT({type : 'info', msg : '게시글이 등록되었습니다.', show: true}))
                router.push("/post/view/" + writeResult.data.POST_ID + "?session=" + session.session);
            }
            if(mode == "edit"){
                let writeResult = await axios.post(API_URL + "/post/edit/" + post.POST_ID, param, {withCredentials: true})
                dispatch(reduxAction.ALERT({type : 'info', msg : '게시글이 수정되었습니다.', show: true}))
                router.push("/post/view/" + writeResult.data.POST_ID + "?session=" + session.session);
            }
        }
        else{
            dispatch(reduxAction.ALERT({type: 'error', msg: '포스트 작성/수정 권한이 없습니다.', show: true}))
        }
    }

    return <>
        <Wrapper>
            <OptionPanel>
                <CheckGroup>
                    <CheckBox 
                        type="checkbox" 
                        id='chk-writemode' 
                        ref={chkWriteMode} 
                        onChange={(e)=>{
                            setWritemode(e.target.checked)
                        }}
                    />
                    <label htmlFor='chk-writemode'>비공개</label>
                </CheckGroup>
                <CheckGroup>
                    <CheckBox 
                        type="checkbox" 
                        id='chk-expose-main' 
                        ref={chkExposeMain} 
                        onChange={(e)=>{
                            setExposeMain(e.target.checked)
                        }}
                    />
                    <label htmlFor='chk-expose-main'>메인에 노출</label>
                </CheckGroup>
            </OptionPanel>
            <TitleWrapper>
                <TitleInput 
                    placeholder='제목'
                    ref={titleInput}
                    onChange={(e)=>setTitleContent(e.target.value)}
                />
            </TitleWrapper>
            <hr />
            <ReactQuill
                theme="bubble"
                value={htmlContent}
                onChange={setHtmlContent}
                onKeyDown={(e)=>{
                    if(e.ctrlKey && e.code == "Enter"){
                        submitHndlr();
                    }
                    if(e.ctrlKey && e.code == "ArrowDown"){
                        arrowDownHndlr();
                    }
                    if(e.ctrlKey && e.code == "ArrowUp"){
                        arrowUpHndlr();
                    }
                    console.log(e);
                }}
                modules={modules}
                style={{
                    backgroundColor: "#f5f5f5",
                    border: "1px dotted #cecece",
                }}
            />
            <ControlBtnGroup>
                <SubmitBtn onClick={() => {
                    submitHndlr();
                }}>
                    <img src="/image/edit.png" />
                    {mode == 'new' && <div>작성</div>}
                    {mode == 'edit' && <div>수정</div>}
                </SubmitBtn>
                <Flex>
                    <ArrowBtn onClick={()=>{arrowDownHndlr()}}>
                        <img src="/image/arrow-down.png" />
                    </ArrowBtn>
                    <ArrowBtn onClick={()=>{arrowUpHndlr()}}>
                        <img src="/image/arrow-up.png" />
                    </ArrowBtn>
                </Flex>
            </ControlBtnGroup>
        </Wrapper>
    </>
}
