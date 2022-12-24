import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    position: absolute;
    top: calc(50px + 4.1rem);
    left: calc(50% - 230px);
    width: 500px;
    background-color: white;
    box-shadow: 2px 5px 3px 0px rgb(0 0 0 / 30%);
    border-radius: 0px 0px 1rem 1rem;
    padding-bottom: 1rem;
`
const Item = styled.div`
    padding: .5rem 1.5rem .5rem 1.5rem;
    border-bottom: 1px solid #e2e2e2;
    & span.keyword{
        color: orange;
        font-weight: bold;
    }
    display: flex;
    justify-content: space-between;
    transition: .3s;
    cursor: pointer;
    &:hover{
        background-color: #e3e3e3;
    }
    &.selected{
        background-color: #e3e3e3;
    }
`
export default function SearchHashtagDialog({ keyword, dataList, setState, keyEvent }) {
    const [selectedItem, setSelectedItem] = useState(-1);
    const [focusedItem, setFocusedItem] = useState(-1);
    const itemRef = useRef([]);
    const router = useRouter();
    useEffect(() => {
        if (selectedItem > -1 && selectedItem < dataList.length) {
            router.push("/post/list/" + dataList[selectedItem].name.replace("#", ""));
            setState(false);
        }
    }, [selectedItem])

    useEffect(() => {
        let e = keyEvent;
        if (!!e) {
            if (e.code === "ArrowUp") {
                e.preventDefault(false);
                setFocusedItem(focusedItem - 1);
                if (focusedItem <= 0) setFocusedItem(dataList.length - 1);

            }
            else if (e.code === "ArrowDown") {
                e.preventDefault(false);
                setFocusedItem(focusedItem + 1);
                if (focusedItem >= dataList.length - 1) setFocusedItem(0);
            }
            else if (e.code === "Enter") {
                e.preventDefault(false);
                setSelectedItem(focusedItem);
            }
        }
    }, [keyEvent])

    useEffect(() => {
        if (focusedItem >= 0) {
            itemRef.current.forEach(item => item.classList.remove("selected"))
            itemRef.current[focusedItem]?.classList.add("selected");
        }
    }, [focusedItem])
    return <Wrapper onClick={(e) => e.stopPropagation()}>
        {
            dataList?.length > 0 && dataList.map((item, idx) => {
                try {
                    let rex = new RegExp(`${keyword}`, 'gi');
                    let display = item.name.replace(rex, `<span class="keyword">${keyword}</span>`);
                    return <Item key={idx}
                        onClick={() => {
                            setSelectedItem(idx);
                        }}
                        ref={(el) => itemRef.current[idx] = el}
                    >
                        <div dangerouslySetInnerHTML={{ __html: display }} />
                        <div>
                            {item.data}
                        </div>
                    </Item>
                }
                catch (e) { return <></> }
            })
        }
    </Wrapper>
}