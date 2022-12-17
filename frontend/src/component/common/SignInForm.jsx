import { useEffect, useRef } from "react"
import styled from "styled-components"

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

export default function SignInForm() {
    const emailRef = useRef();
    useEffect(() => {
        emailRef.current.focus();
    }, [])
    return <>
        <Wrapper onClick={(e) => { e.stopPropagation() }}>
            <Title>
                Sign-In
            </Title>
            <FormControl>
                <input type="text" placeholder="E-mail Account" ref={emailRef} />
            </FormControl>
            <FormControl>
                <input type="password" placeholder="Password" />
            </FormControl>

        </Wrapper>
    </>
}