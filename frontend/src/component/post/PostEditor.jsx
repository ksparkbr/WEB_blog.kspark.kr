import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const SubmitBtn = styled.div`
    position: sticky;
    bottom: 1rem;
    margin: 0;
    left: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .2rem;
    transition: .3s;
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

const CheckBox = styled.input``

export default function PostEditor({ mode, post }) {
    const session = useSelector(s=>s.session);
    const [htmlContent, setHtmlContent] = useState();    //본문
    const [titleContent, setTitleContent] = useState();  //제목
    const [writemode, setWritemode] = useState(false);   //비공개여부
    const [exposeMain, setExposeMain] = useState(true);  //메인공개여부


    const chkWriteMode = useRef();
    const chkExposeMain = useRef();
    const titleInput = useRef();

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

    useEffect(()=>{
        console.log(titleContent);
        console.log(htmlContent);

    },[titleContent, htmlContent])

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
                modules={modules}
            />
            <SubmitBtn>
                <img src="/image/edit.png" />
                {<div>작성</div>}
            </SubmitBtn>
        </Wrapper>
    </>
}
