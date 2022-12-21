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
    @media screen and (min-width: 992px) and (max-width: 1199px){
        min-width: 992px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        min-width: 768px;
    }
    @media screen and (max-width: 767px){

    }
`

const FooterContent = styled.div`
    min-width: 1200px;
    align-items: center;
    display: flex;
    margin: 0 auto;
    @media screen and (min-width: 992px) and (max-width: 1199px){
        min-width: 992px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        min-width: 768px;
    }
    @media screen and (max-width: 767px){
        min-width: 100px;
        max-width: 767px;margin: 0;
    }
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