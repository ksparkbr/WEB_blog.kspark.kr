import styled from "styled-components";

const TopWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 100vw;
    background: linear-gradient(45deg, #01001b, black, #01001b);
    color: white;
    margin: 0 auto;
    height: 80px;
    box-shadow: 3px 3px 6px 0px rgb(0 0 0 / 50%);
    z-index: 997;
`

const TopContent = styled.div`
    display: flex;
    min-width: 1200px;
    justify-content: space-between;
    align-items: center;
`
const TopLogo = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: #c2c6ff;
    }
`
export default function Top(){
    return <>
        <TopWrapper>
            <TopContent>
                <TopLogo>
                    BLOG.KSPARK.KR
                </TopLogo>
            </TopContent>
        </TopWrapper>
    </>
}