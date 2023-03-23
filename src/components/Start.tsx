import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BigLogo, MainLogo } from '../assets/images';
import { setIsStarted } from '../features/questSlice';

const Start = () => {
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(setIsStarted(true));
  };

  return (
    <Container>
      <FullScreenLogo />
      <img src={MainLogo} alt='' />

      <h1 onClick={() => handleStart()}>
        კითხვარის <br />
        დაწყება
      </h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 97px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;
    text-transform: lowercase;
    font-feature-settings: 'case' on;

    color: ${({ theme }) => theme.colors.text};

    cursor: pointer;
  }

  h1,
  img {
    opacity: 0;

    //animate timing function
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    // animate and fade in logo on load after
    animation: svg2 1.5s 1.5s forwards;

    @keyframes svg2 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
`;

const FullScreenLogo = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BigLogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;

  // animate and fade in logo on load after 1s
  animation: fadeIn 1s ease-in-out 1s forwards;

  @keyframes fadeIn {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
export default Start;
