import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Pagination from "../../src/component/common/Pagination"
import { reduxAction } from "../../src/redux/redux-action"

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    background-color: white;
    padding: 1rem;
    box-shadow: 5px 5px 6px 0px rgba(0,0,0,30%);
    margin-bottom: 1rem;
    border-radius: 1rem 1rem 1rem 1rem;
    & hr{
        margin-top: 1rem;
        border: 1px solid #eeeeee;
    }
    & table{
        border-collapse: collapse;
        text-align: center;
        width: 100%;
    }
    & table tr{
        transition: .3s;
        &:hover{
            background-color: #e8e8e8;
        }
    }
    & table tr th{ 
        background-color: #c5edec;
    }
    & table tr td, & table tr th{
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding-top: .5rem;
        padding-bottom: .5rem;
    }
`
const Flex = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`

const SearchWrapper = styled.div`

`
const SearchInput = styled.input`
    font-size: 1rem;
    padding: .5rem;
    padding-left: .5rem;
    border-radius: .5rem;
    border: 1px solid #c3e3ff;
    width: 300px;
    &:focus-visible{
        outline-offset: 0px;
        outline: #c3e3ff auto 1px;
    }
    margin-bottom: 1rem;
`

const HashTag = styled.div`
    cursor: pointer;
    color: rgb(20, 134, 214);
    font-weight: bold;
    transition: .3s;
    &:hover{
        color : #9bd5ff;
    }
`

const ExposeChk = styled.input`

`

export default function HashtagConfig() {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const [shownTagList, setShownTagList] = useState([]);
    const [tagListOrigin, setTagListOrigin] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');

    const getData = async () => {
        let data = await axios.get(API_URL + "/tag/list").then(res => res.data)
        setTagListOrigin(data);
    }
    const searchTag = (_keyword) => {
        if (_keyword == '') setSearchResult(tagListOrigin);
        else {
            try {
                setSearchResult(tagListOrigin.filter(item => item.hashtag.toLowerCase().search(_keyword.toLowerCase()) >= 0));
            }
            catch (e) { }
        }
    }
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (tagListOrigin.length > 0) {
            searchTag(keyword);
        }
    }, [tagListOrigin])

    useEffect(() => {
        searchTag(keyword);
    }, [keyword])

    useEffect(()=>{
        setShownTagList(searchResult);
    }, [searchResult])

    const dispatch = useDispatch();
    const dateformat = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: "short" })
    const exposeChangeHndlr = async (e)=>{
        let tag = e.target.getAttribute("data-tag");
        let session = window.sessionStorage.getItem("session");
        let expose = 'N';
        if(e.target.checked){
            expose = 'Y';
        }
        let url = `${API_URL}/tag/update/${expose}`
        let result = await axios.post(url,
            {session: session, idx: tag}
        ).then(res => res.data)
        if(result == "Access Denied"){
            dispatch(reduxAction.ALERT({type: 'error', msg: '수정권한이 없습니다.',  show: true}))
        }
        else{
            const getMenu = async () => {
                let menu = await axios.get(`${API_URL}/tag/menu`).then(res => res.data);
                menu = menu.sort((a, b) => a.idx - b.idx)
                dispatch(reduxAction.HASHTAG_MENU(menu));
            }
            getMenu();
        }
    }
    const router = useRouter();
    return <Wrapper>
        <Flex>
            <SearchWrapper>
                <SearchInput
                    placeholder="해시태그 검색"
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                >

                </SearchInput>
            </SearchWrapper>
        </Flex>
        <table>
            <thead>
                <tr>
                    <th>구분</th>
                    <th>해시태그</th>
                    <th>메인공개여부</th>
                    <th>생성일자</th>
                    <th>관련포스트수</th>
                </tr>
            </thead>
            <tbody>
                {
                    shownTagList.length > 0 && shownTagList.map((item, idx) => {
                        return <tr key={idx}>
                            <td>{item.idx}</td>
                            <td>
                                <HashTag onClick={()=>{
                                    router.push("/post/list/" + item.hashtag.replace("#", ""))
                                }}>
                                    {item.hashtag}
                                </HashTag>
                            </td>
                            <td>
                                <ExposeChk 
                                    type="checkbox" 
                                    defaultChecked={ item.expose_main == "Y" ? true : false } 
                                    data-tag={item.idx}
                                    onClick={(e)=>{
                                        exposeChangeHndlr(e);
                                    }}
                                />
                            </td>
                            <td>{dateformat.format(new Date(item.create_date))}</td>
                            <td>{item.relative_post}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        {
            searchResult.length > 0 && <Pagination dataList={searchResult} showItems={15} setDataList={setShownTagList} />
        }
    </Wrapper>
}