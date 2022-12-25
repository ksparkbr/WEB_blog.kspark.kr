import { useEffect, useRef, useState } from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`

const PaginationItem = styled.div`
    cursor: pointer;
    color: rgb(20,134,214);
    padding-left: .5rem;
    padding-right: .5rem;
    transition: .3s;
    &:hover{
        color: #004f71;;
    }
    &.selected{
        color: black;
        font-weight: bold;
        cursor: default;
    }
`

export default function Pagination({ dataList, showItems, setDataList }) {
    const [paginationItem, setPaginationItem] = useState([]);
    const [curSelected, setCurSelected] = useState(0);

    const makePagination = () => {
        let pagination = [];
        let paginationSize = Math.ceil(dataList.length / showItems);
        for (let i = 1; i <= paginationSize; i++) {
            pagination.push(i);
        }
        setPaginationItem(pagination);
        setTimeout(()=>setCurSelected(1), 100);
    }
    const selectPaginationItem = (item)=>{
        if(!!paginationItemRef.current.length){
            setDataList(dataList.filter((_item, idx)=>idx >= ((item-1) * showItems) && idx < ((item-1) * showItems + showItems)));
            paginationItemRef.current.forEach((item)=>{
                item.classList.remove("selected");
            })
            paginationItemRef.current[item-1].classList.add("selected");
            setCurSelected(item);
        }
    }
    useEffect(() => {
        makePagination();
    }, [])

    useEffect(()=>{
        selectPaginationItem(curSelected);
    },[curSelected])

    const paginationItemRef = useRef([]);
    return (
        <Wrapper>
            {
                <>
                { curSelected !== 1 && 
                    <PaginationItem onClick={()=>{
                        setCurSelected(curSelected - 1)
                    }}>
                        ◀
                    </PaginationItem>
                }
                {
                    paginationItem.length > 0 && paginationItem.map((item, idx) => {
                        return (
                            <PaginationItem onClick={(e)=>{
                                selectPaginationItem(item);
                            }}
                                ref={(el) => paginationItemRef.current[idx]=el}
                            >
                                {item}
                            </PaginationItem>
                        )
                    })
                }
                { curSelected !== paginationItem.length && 
                    <PaginationItem onClick={()=>{setCurSelected(curSelected + 1)}}>
                        ▶
                    </PaginationItem>
                }
                </>
            }
        </Wrapper>
    )


}