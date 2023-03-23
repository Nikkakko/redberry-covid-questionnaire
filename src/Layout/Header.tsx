import styled from 'styled-components';
import { useMultistepForm } from '../hooks/useMultistepForm';
import { RedberryLogo } from '../assets/images';

type HeaderProps = {
  currentStepIndex: number;
  steps: JSX.Element[];
};

const Header = ({ currentStepIndex, steps }: HeaderProps) => {
  return (
    <Container>
      <Wrapper>
        <ImageLogo src={RedberryLogo} alt='Redberry Logo' />
        <Current>
          <p>
            {currentStepIndex + 1} / {steps.length}
          </p>
        </Current>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  height: 95px;
  width: 100%;

  &:after {
    content: '';
    display: block;
    width: 100%;
    /* height: 1px; */
    margin-top: 5px;
    border: 1.8px solid #232323;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageLogo = styled.img`
  width: 147.8px;
  height: 24px;
`;

const Current = styled.div`
  p {
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
    text-align: right;

    color: #232323;
  }
`;

export default Header;
