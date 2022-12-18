import styled from "styled-components"
import { useRouter} from "next/router";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    position: relative;
    height: 380px;
    box-shadow: 0 0 10px 0px rgb(0,0,0,20%);
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
    transition: .3s;
    position: relative;
    &:hover{
        box-shadow: 0 0 10px 0px rgb(0,0,0,50%);
    }
    
`
const Thumbnail = styled.div`
    background-image: url("${(props) => props.src || "/image/avatar.png"}");
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0px 0px;
`

const PostInfo = styled.div`
    padding: 1rem;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`

const PostDate = styled.div`
    color: grey;
    font-size: .8rem;
    font-weight: bold;
`
const LikeStatus = styled.div`
    font-size: .8rem;
    font-weight: bold;
    display:flex;
    align-items: center;
`
const LikeImg = styled.img`
    width:.8rem;height:.8rem;
    margin-right: .3rem;
`

const PostTitle = styled.div`
    margin-top: .7rem;
    font-size: 1.1rem;
    font-weight: bold;
`
const PostSummary = styled.div`
    margin-top: .5rem;
    font-size: 1rem;
    color: grey;
`

const HashTags = styled.div`
    position: absolute;
    bottom: 0px;
    left:0px;
    padding: .5rem;
    border-top: 1px solid #ececec;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #00bdff;
    font-size: .9rem;
    text-align: center;
`

const LockImg = styled.img`
    position: absolute;
    width: 1.2rem;
    right: 10px;
    top: 10px;
`

export default function PostCard({ item }) {
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    const router = useRouter();
    const session = useSelector(s => s.session);
    return <>
        {
            item && (
                <Wrapper onClick={()=>{
                    router.push(`/post/view/${item.POST_ID}${session.session ? `?session=${session.session}` : ''}`)
                }}>
                    <Thumbnail src={item.THUMBNAIL} />
                    <PostInfo>
                        <Flex>
                            <PostDate>
                                {dateformat.format(new Date(item.POST_DATE))}
                            </PostDate>
                            <LikeStatus>
                                <LikeImg src="/image/like-on.png" /><span>{item.LIKE_COUNT}</span>
                            </LikeStatus>
                        </Flex>
                        <PostTitle>
                            {item.TITLE}
                        </PostTitle>
                        <PostSummary>
                            {item.SUMMARY.length >= 50 ? item.SUMMARY + "..." : item.SUMMARY}
                        </PostSummary>
                        <HashTags>
                            {JSON.parse(item.HASH_TAGS).join(" ")}
                        </HashTags>
                    </PostInfo>
                    {item.WRITE_MODE == "private" && (
                        <LockImg src="/image/lock.png" />

                    )}
                </Wrapper>
            )
        }
    </>
}