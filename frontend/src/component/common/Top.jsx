import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { reduxAction } from "../../redux/redux-action";
import Alert from "./Alert";

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
export default function Top() {
    const alert = useSelector(s => s.alert);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const dispatch = useDispatch();

    const session = useSelector(s => s.session);

    const checkSession = async () => {
        let session = window.sessionStorage.getItem("session");
        if(session){
            let checkSession = await axios.post(API_URL + "/session/check", {session : session}, {withCredentials : true}).then(res => res.data);
            if(checkSession){
                dispatch(reduxAction.SESSION({admin : checkSession, session : session}));
            }
        }
        else{
            dispatch(reduxAction.SESSION({admin : false, session : null}));
        }
    }

    useEffect(()=>{
        checkSession();
    },[])

    useEffect(()=>{console.log(session)},[session])

    const router = useRouter();

    return <>
        <TopWrapper>
            <TopContent>
                <TopLogo onClick={()=>{
                    router.push("/post/list");
                }}>
                    BLOG.KSPARK.KR
                </TopLogo>
            </TopContent>
        </TopWrapper>
        {
            alert.show && <Alert type={alert.type}>
                {alert.msg}
            </Alert>
        }
    </>
}