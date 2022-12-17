import { useState } from "react"
import styled from "styled-components"
import Alert from "./Alert"
import Modal from "./Modal"
import SignInForm from "./SignInForm"

const Wrapper = styled.div`
    color: grey;
    width: 100%;
    font-weight: bold;
    height: 60px;
    background: linear-gradient(0deg, transparent, white, white);
    z-index: 900;
    position: sticky;
    top: 0px;
    align-items:center;
    @media screen and (max-width: 767px){
        margin-right: 0;
    }
`

const ControlDiv = styled.div`
    display: flex;
    justify-content: end;
    margin: 0 auto;
    max-width: 1200px;
    align-items: center;
    padding-top: .5rem;
    gap: 1rem;
`

const Btn = styled.div`
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: #000000;
    }
`

export default function ControlPannel() {
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(false);
    return <><Wrapper>
        <ControlDiv>
            <Btn onClick={()=>{
                setModal(true);
            }}>Sign-In</Btn>
            <Btn>Write Post</Btn>
            <Btn onClick={()=>{
                setAlert(true);
            }}>Alert Test</Btn>
        </ControlDiv>
    </Wrapper>
    {modal && <Modal setState={setModal}><SignInForm /></Modal>}
    {alert && <Alert setState={setAlert} type={"error"}>
            로그인에 성공하였습니다.
    </Alert>}
    </>
}