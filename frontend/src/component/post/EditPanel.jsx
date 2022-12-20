import axios from "axios"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { reduxAction } from "../../redux/redux-action"

const Wrapper = styled.div`
    position: sticky;
    top: 80px;
`
const Flex = styled.div`
    display: flex;
    justify-content: end;
    gap: 1rem;
`

const ControlImg = styled.img`
    width: 2.5rem;
    cursor: pointer;
    transition: .3s;
    border-radius: 1rem;
    padding: .2rem;
    &:hover{
        box-shadow: 5px 5px 5px 0 rgba(0,0,0,30%);
    }
`

export default function EditPanel({id}){
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND;
    const session = useSelector(s => s.session);
    const dispatch = useDispatch()
    const deletePostHndlr = async () => {
        let deleteResult = await axios.post(API_URL + '/post/delete/' + id, {session : session.session})
        if(deleteResult == 'Access Denied'){
            dispatch(reduxAction.ALERT({type : 'error', msg : '게시글 삭제권한이 없습니다.', show: true}))
        }
        else{
            dispatch(reduxAction.ALERT({type : 'info', msg : '게시글이 삭제되었습니다.', show: true}))
            router.push("/post/list");
        }
        
    }

    return <Wrapper>
        <Flex>
            <ControlImg src="/image/edit.png" 
                onClick={()=>{
                    router.push("/post/editor/" + id);
                }}  
            />
            <ControlImg src="/image/delete.png" 
                onClick={()=>{
                    deletePostHndlr();
                }}
            />
        </Flex>

    </Wrapper>


}