import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { reduxAction } from "../../redux/redux-action";

const Wrapper = styled.div`
    position: fixed;
    top: 2rem;
    left: calc(100vw / 2 - 250px);
    //width: 500px;
    //height: 3rem;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${props => props.type == 'error' ? '#ffd7d7dd' : '#d2f2ffdd'};
    border-top: 2px solid ${props => props.type == 'error' ? '#fd3737' : '#1381ae'};
    border-bottom: 2px solid ${props => props.type == 'error' ? '#fd3737' : '#1381ae'};
    color: ${props => props.type == 'error' ? '#fd3737' : '#1381ae'};
    text-align: center;
    width: 0px;
    height: 0;
    transition: .2s;
    z-index: 1000;
    overflow: hidden;
    white-space: nowrap;
`

const AlertImg = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`

export default function Alert({ type, children }) {
    const alert = useSelector(s => s.alert);
    const dispatch = useDispatch();

    const wrapperRef = useRef()
    const ALERT_TIME = 3;
    const [timer, setTimer] = useState(ALERT_TIME);

    const showAction = () => {
        if (wrapperRef) {
            setTimeout(() => { try { wrapperRef.current.style.width = "500px" } catch (e) { } }, 1);
            setTimeout(() => { try { wrapperRef.current.style.height = "3rem" } catch (e) { } }, 200);
        }
    }

    const hideAction = () => {
        if (wrapperRef) {
            try {
                setTimeout(() => { try { wrapperRef.current.style.height = "0px" } catch (e) { } }, 1);
                setTimeout(() => { try { wrapperRef.current.style.width = "0px" } catch (e) { } }, 200);
                setTimeout(() => dispatch(reduxAction.ALERT({ ...alert, show: false})), 401);
            }
            catch (e) { }
        }
    }

    useEffect(() => {
        showAction();
    }, [])

    useEffect(() => {
        setTimeout(() => setTimer(timer - 1), 1000);
        if (timer <= 0) {
            hideAction();
        }
    }, [timer])

    return <>
        <Wrapper type={type} ref={wrapperRef} onClick={(e) => {
            hideAction();
        }}>
            {type == "error" && <AlertImg src="/image/warning.png" />}
            {type != "error" && <AlertImg src="/image/info.png" />}
            {children}
        </Wrapper>
    </>
}