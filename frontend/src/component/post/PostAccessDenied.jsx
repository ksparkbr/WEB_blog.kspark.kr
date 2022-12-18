import { useRouter } from "next/router"
import styled from "styled-components"

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    background-color: white;
    padding: 1rem;
    box-shadow: 5px 5px 6px 0px rgba(0,0,0,30%);
    margin-bottom: 1rem;
    border-radius: 1rem;
    height: 40rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BackBtn = styled.div`
    cursor: pointer;
    font-weight: bold;
    color: blue;
    transition: .5s;
    &:hover{
        color: lightblue;
    }
`

const LockImg = styled.img`
    width: 250px;
`

const Msg = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
`

export default function PostAccessDenied() {
    const router = useRouter();
    return <Wrapper>

        <div>
            <LockImg src="/image/lock.png" />
            <Msg>
                게시글이 없거나 읽을 권한이 없습니다.
            </Msg>
            <BackBtn onClick={() => {
                router.back();
            }}>
                ☜ 뒤로
            </BackBtn>
        </div>


    </Wrapper>
}