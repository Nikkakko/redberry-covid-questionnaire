import styled from 'styled-components';

type LeftArrowProps = {
  onClick: () => void;
};

const LeftArrow = ({ onClick }: LeftArrowProps) => {
  return (
    <Svg
      onClick={onClick}
      width='18'
      height='23'
      viewBox='0 0 18 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17 1L3 11.3158L17 21.6316' stroke='#232323' strokeWidth='2.4' />
    </Svg>
  );
};

const attrs = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
})``;

const Svg = styled(attrs)`
  cursor: pointer;
`;

export default LeftArrow;
