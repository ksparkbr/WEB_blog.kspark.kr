import Head from "next/head";
import { useEffect, useRef } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: #00000050;
    opacity: 0;
    transition: .3s;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
`

export default function Modal({ children, setState }) {
    const modalRef = useRef();

    const showAction = () => {
        setTimeout(() => { modalRef.current.style.opacity = 1 }, 1);
    }
    const hideAction = () => {
        setTimeout(() => { modalRef.current.style.opacity = 0 }, 1);
        setTimeout(() => {
            setState(false);
        }, 300);
    }

    useEffect(() => {
        showAction();
    }, [])

    return <>
        <Head>
            <title>로그인 | BLOG.KSPARK.KR</title>
        </Head>
        <Wrapper onClick={(e) => {
            e.stopPropagation();
            hideAction();
        }}
            ref={modalRef}
        >
            {children}
        </Wrapper>
    </>
}