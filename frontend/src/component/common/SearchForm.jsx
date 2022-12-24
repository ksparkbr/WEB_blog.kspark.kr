import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { debounce } from 'lodash'
import axios from "axios"
import SearchHashtagDialog from "./SearchForm/SearchHashtagDialog"
import SearchPostDialog from "./SearchForm/SearchPostDialog"
import { useSelector } from "react-redux"

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

export default function SearchForm({ setState }) {
    const inputRef = useRef();
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const [searchMode, setSearchMode] = useState('');
    const session = useSelector(s => s.session);
    const searchHndlr = async () => {
        if (keyword !== '') {
            if (keyword[0] === '#') {
                setSearchMode('hashtag');
                let data = await axios.post(`${API_URL}/tag/search`, { keyword, session: session.session }, { withCredentials: true }).then(res => res.data);
                setSearchResult(data.map(item => { return { name: item.hashtag, data: item.relative_post, session: session.session } }))
            }
            else {
                if (keyword[0] !== '.') {
                    setSearchMode('post');
                    let data = await axios.post(`${API_URL}/post/search`, { keyword, session: session.session }, { withCredentials: true }).then(res => res.data);
                    setSearchResult(data.map(item => { return { name: item.TITLE, data: item.SUMMARY, id: item.POST_ID } }))
                }
            }
        }
        else {
            setSearchMode('');
            setSearchResult([]);
        }
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        searchHndlr(keyword);
    }, [keyword])

    const [event, setEvent] = useState(null);

    return <>
        <Wrapper onClick={(e) => { e.stopPropagation() }}>
            <SearchImage src="/image/search.png" />
            <SearchInput placeholder="태그, 포스트 내용 검색"
                ref={inputRef}
                onChange={debounce((e) => {
                    setKeyword(e.target.value);
                }, 500)}
                onKeyDown={(e) => {
                    setEvent(e);
                }}
            />
        </Wrapper>
        {searchMode === 'hashtag' && searchResult.length > 0 &&
            <SearchHashtagDialog
                keyword={keyword}
                dataList={searchResult}
                setState={setState}
                keyEvent={event}
            />
        }
        {searchMode === 'post' && searchResult.length > 0 &&
            <SearchPostDialog
                keyword={keyword}
                dataList={searchResult}
                setState={setState}
                keyEvent={event}
            />
        }
    </>
}