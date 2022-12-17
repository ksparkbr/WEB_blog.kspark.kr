import styled from "styled-components"

const FooterWrapper = styled.div`
    max-width: 100vw;
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content: center;
    align-item: center;
    color: grey;
    font-weight: bold;
    border-top: 1px solid #bebebe;
`

const FooterContent = styled.div`
    min-width: 1200px;
    align-items: center;
    display: flex;
`

export default function Footer() {
    return <>
        <FooterWrapper>
            <FooterContent>
                Designed By kspark. Since 2022.12
            </FooterContent>
        </FooterWrapper>

    </>
}