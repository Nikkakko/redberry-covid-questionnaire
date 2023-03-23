import styled from 'styled-components';
import StarIcon from '../svg/StarIcon';

const Thanks = () => {
  return (
    <Container>
      <StarIcon />
      <StarIcon />
      <Text>მადლობა</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #232323;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  // first svg element in container
  & > svg:first-child {
    width: 52.29px;
    height: 52.29px;
  }

  // second svg element in container
  & > svg:nth-child(2) {
    width: 33px;
    height: 33px;
  }

  // animate svg elements to show up after 1 second from center of the screen to their positions
  & > svg:first-child {
    opacity: 0;
    animation: svg1 1.5s 1.5s forwards;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;

    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

    @keyframes svg1 {
      0% {
        transform: translate(-50%, -50%);
        opacity: 0;
      }

      100% {
        transform: translate(-350%, -180%);
        opacity: 1;
      }
    }
  }

  & > svg:nth-child(2) {
    opacity: 0;
    animation: svg2 1.5s 1.5s forwards;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;

    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

    @keyframes svg2 {
      0% {
        transform: translate(-50%, -50%);
        opacity: 0;
      }

      100% {
        transform: translate(400%, 120%);
        opacity: 1;
      }
    }
  }
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  letter-spacing: 0.24em;
  opacity: 0;

  color: #ffffff;

  // aniamte text to show up after 1 second
  animation: text 1s 1s forwards;

  @keyframes text {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export default Thanks;
