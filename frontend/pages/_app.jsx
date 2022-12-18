import '../styles/globals.css'
import '../public/font/font.css'
import { useRouter } from 'next/router';
import { reduxStore } from '../src/redux/redux-store';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Top from '../src/component/common/Top';
import Footer from '../src/component/common/Footer';
import ControlPannel from '../src/component/common/ControlPannel';
import styled from 'styled-components';

const TIMEOUT = 100;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};

const Wrapper = styled.div`
  position: relative;
`
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return <>
    <Provider store={reduxStore}>
      <Top />
      <Wrapper>
        <ControlPannel />
        <TransitionGroup>
          <Transition
            key={router.pathname}
            timeout={{
              enter: TIMEOUT,
              exit: TIMEOUT,
            }}
          >
            {(status) => (
              <div style={{ ...getTransitionStyles[status] }}>
                <Component {...pageProps} />
              </div>
            )}
          </Transition>
        </TransitionGroup>
      </Wrapper>
      <Footer />
    </Provider>

  </>
}
