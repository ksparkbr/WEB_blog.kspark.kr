import styled from "styled-components"

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
    width: 3rem;
    cursor: pointer;
    transition: .3s;
    border-radius: 1rem;
    padding: .3rem;
    &:hover{
        box-shadow: 5px 5px 5px 0 rgba(0,0,0,30%);
    }
`

export default function EditPanel(){
    return <Wrapper>
        <Flex>
            <ControlImg src="/image/edit.png" />
            <ControlImg src="/image/delete.png" />
        </Flex>

    </Wrapper>


}