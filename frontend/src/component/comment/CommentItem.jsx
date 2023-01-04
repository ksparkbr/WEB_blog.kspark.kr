import { useState } from "react"
import styled from "styled-components"
import ReplyEditor from "./ReplyEditor"
import ReplyView from "./ReplyView"

const Wrapper = styled.div`
border-top: 1px solid #e2e2e2;
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

const MoreBtn = styled.div`
margin-left: .5rem;
font-size: .9rem;
color: grey;
cursor: pointer;
&:hover{
    color: black;
}
text-decoration: underline;
text-underline-offset: 2px;
`

const ReplyWrapper = styled.div`
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    //margin-top: 1rem;
`

export default function CommentItem({ item, toggle, setToggle }) {
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    const [replyToggle, setReplyToggle] = useState(false);

    return <Wrapper>
        <CommentAuthor>
            <CommentImg src="/image/user.png" />
            <Flex style={{ alignItems: "end" }}>
                <div>
                    {item.author}
                </div>
                <AuthorIP>
                    ({item.author_ip})
                </AuthorIP>
            </Flex>
        </CommentAuthor>
        <CommentContent dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/gi, "<br>") }} />
        <Flex style={{marginBottom: "1rem"}}>
            <CommentDate>
                {dateformat.format(new Date(item.comment_date))}
            </CommentDate>
            <MoreBtn
                style={{
                    backgroundColor: replyToggle ? "#e2e2e2" : ""
                }}
                onClick={() => {
                    setReplyToggle(!replyToggle);
                }}>
                답글
            </MoreBtn>
            <MoreBtn>
                수정
            </MoreBtn>
            <MoreBtn>
                삭제
            </MoreBtn>
        </Flex>
        {
            replyToggle && <ReplyWrapper>
                <ReplyEditor item={item} toggle={toggle} setToggle={setToggle} setReplyToggle={setReplyToggle} />
            </ReplyWrapper>
        }
        {
            item.reply.length > 0 && item.reply.map((item, idx)=>{
                return <ReplyWrapper key={idx}>
                    <ReplyView item={item} key={idx} />
                </ReplyWrapper>
            })
        }
    </Wrapper>

}