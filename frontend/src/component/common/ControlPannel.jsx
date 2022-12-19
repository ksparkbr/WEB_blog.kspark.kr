import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { reduxAction } from "../../redux/redux-action"
import Alert from "./Alert"
import Modal from "./Modal"
import SignInForm from "./SignInForm"

const Wrapper = styled.div`
    color: grey;
    width: 100%;
    font-weight: bold;
    height: 60px;
    background: linear-gradient(0deg, transparent,rgb(214, 219, 220));
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
    padding-right: 1rem;
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
    const session = useSelector(s=>s.session);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const dispatch = useDispatch();
    const router = useRouter();

    const signOutHndlr = async () => {
        let signoutstate = await axios.post(API_URL + "/session/signout", {session : session.session}).then(res => res.data);
        window.sessionStorage.removeItem("session");
        dispatch(reduxAction.SESSION({admin: false, session: null}));
        dispatch(reduxAction.ALERT({type: "error", show: true, msg:"로그아웃 되었습니다."}));
        router.push("/post/list")
    }

    return <><Wrapper>
        <ControlDiv>
            {!session.admin && 
                <Btn onClick={()=>{
                    setModal(true);
                }}>Sign-In</Btn>
            }
            {session.admin && 
                <Btn onClick={()=>{
                    signOutHndlr();
                }}>Sign-Out</Btn>
            }
            {session.admin && 
                <Btn onClick={()=>{
                    router.push("/post/editor/new")
                }}>Write Post</Btn>
            }
        </ControlDiv>
    </Wrapper>
    {modal && <Modal setState={setModal}><SignInForm setState={setModal} /></Modal>}
    </>
}