import { useEffect, useRef } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    position: fixed;
    top: 50px;
    background-color: white;
    height: 4rem;
    border-radius: 1rem;
    box-shadow: 2px 5px 3px 0px rgb(0 0 0 / 30%);
    display: flex;
    justify-content : center;
    align-items: center;
`

const SearchInput = styled.input`
    font-size: 1rem;
    padding: 1rem;
    padding-left: .5rem;
    border-radius: .5rem;
    border: 0;
    width: 500px;
    &:focus-visible{
        outline-offset: 0px;
        outline: #c3e3ff auto 1px;
    }
    margin-right: 1rem;
`

const SearchImage = styled.img`
    width: 2rem;
    margin-left: 1rem;
`

export default function SearchForm({setState}){
    const inputRef = useRef();
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return <>
        <Wrapper onClick={(e) => { e.stopPropagation() }}>
            <SearchImage src="/image/search.png" />
            <SearchInput placeholder="태그, 포스트 내용 검색" ref={inputRef}/>
        </Wrapper>

    </>
}