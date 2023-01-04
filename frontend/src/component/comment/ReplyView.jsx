import { useState } from "react"
import styled from "styled-components"


const WrapperFlex = styled.div`
    display: flex;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e2e2e2;
    gap: .5rem;
`
const Wrapper = styled.div`
    padding: 1rem;
    padding-left: .2rem;
    background-color: #f5f5f5;
    width:100%;
`
const Flex = styled.div`
    display: flex;
    background-color: #f5f5f5;
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

export default function ReplyView({ item }) {
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    const [replyToggle, setReplyToggle] = useState(false);
    return <WrapperFlex>
        <div style={{padding: "1rem", paddingRight: "0"}}>
            └
        </div>
        <Wrapper>
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
            <Flex>
                <CommentDate>
                    {dateformat.format(new Date(item.comment_date))}
                </CommentDate>
                <MoreBtn>
                    수정
                </MoreBtn>
                <MoreBtn>
                    삭제
                </MoreBtn>
            </Flex>
        </Wrapper>
    </WrapperFlex>
}