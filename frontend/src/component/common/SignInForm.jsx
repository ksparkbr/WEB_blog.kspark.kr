import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { reduxAction } from "../../redux/redux-action"
import Alert from "./Alert"

const Wrapper = styled.div`
    //width: 310px;
    //height: 170px;
    background-color: #ffffffdd;
    border-radius: 10px;
    box-shadow: 3px 5px 6px 0px rgb(0,0,0,30%);
    padding: 1rem;
`

const FormControl = styled.div`
    padding: .5rem;
    & input{
        font-size: 1.2rem;
        border-radius: 10px;
        border: 1px solid grey;
        padding: .5rem;
    }
`
const Title = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
`

export default function SignInForm({setState}) {
    const emailRef = useRef();
    const [loginInfo, setLoginInfo] = useState({id : '', password : ''});
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const loginHndlr = async ()=>{
        if(loginInfo.id !== '' && loginInfo.password !== ''){
            let result = await axios.post(API_URL + "/session/signin", loginInfo, {withCredentials: true}).then(res => res.data);
            if(result !== "Access Denied"){
                window.sessionStorage.setItem("session", result);
                dispatch(reduxAction.SESSION({session : result, admin : true}));
                dispatch(reduxAction.ALERT({show: true, type: "info", msg : "로그인에 성공하였습니다. (관리자용)"}))
                router.push("/post/list");
                setState(false);
            }
            else{
                dispatch(reduxAction.ALERT({show: true, type: "error", msg : "로그인에 실패 하였습니다."}))
            }
        }
    }
    return <>
        <Wrapper onClick={(e) => { e.stopPropagation() }}>
            <Title>
                Sign-In
            </Title>
            <FormControl>
                <input type="text" placeholder="E-mail Account" ref={emailRef} 
                    onChange={(e)=>{
                        setLoginInfo({
                            ...loginInfo,
                            id : e.target.value,
                        })
                    }}
                />
            </FormControl>
            <FormControl>
                <input type="password" placeholder="Password" 
                    onChange={(e)=>{
                        setLoginInfo({
                            ...loginInfo,
                            password : e.target.value,
                        })
                    }}
                    onKeyDown={(e)=>{
                        if(e.key == "Enter"){
                            loginHndlr();
                        }
                    }}
                />
            </FormControl>
        </Wrapper>
    </>
}