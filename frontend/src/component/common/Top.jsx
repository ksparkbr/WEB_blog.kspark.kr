import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { reduxAction } from "../../redux/redux-action";
import Alert from "./Alert";
import Modal from "./Modal";
import SearchForm from "./SearchForm";

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
    @media screen and (max-width: 767px){
        flex-direction: column;
        justify-content: space-around;
    }
`

const TopContent = styled.div`
    display: flex;
    min-width: 1200px;
    justify-content: space-between;
    align-items: center;
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
const TopLogo = styled.div`
    display: flex;
    gap: .5rem;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: #c2c6ff;
    }
    @media screen and (max-width: 767px){
        margin-left: 0px;
    }
`
const AvatarImage = styled.img`
    width: 3rem;
    border-radius: 3rem;
    border: 4px solid #004b6b;
`

const Flex = styled.div`
    display: flex;
    gap: 1rem;
`

const SearchImage = styled.img`
    width: 2rem;
    cursor: pointer;
`

export default function Top() {
    const alert = useSelector(s => s.alert);
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const dispatch = useDispatch();
    const [searchModal, setSearchModal] = useState(false);

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

    const router = useRouter();

    return <>
        <TopWrapper>
            <TopContent>
                <TopLogo onClick={()=>{
                    router.push("/post/list");
                }}>
                    <AvatarImage src="/image/avatar.png" />
                    <span>BLOG.KSPARK.KR</span>
                </TopLogo>
                <Flex>
                    <SearchImage src="/image/search.png" 
                        onClick={()=>{setSearchModal(true)}}
                    />

                </Flex>
            </TopContent>
        </TopWrapper>
        {
            alert.show && <Alert type={alert.type}>
                {alert.msg}
            </Alert>
        }
        {
            searchModal && <Modal setState={setSearchModal}>
                <SearchForm setState={setSearchModal} />
            </Modal>
        }
    </>
}