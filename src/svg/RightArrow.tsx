import styled from 'styled-components';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
};

const RightArrow = ({ onClick, isDisabled }: Props) => {
  return (
    <Svg
      width='18'
      height='23'
      viewBox='0 0 18 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    >
      <path d='M1 1L15 11.3158L1 21.6316' stroke='#232323' strokeWidth='2.4' />
    </Svg>
  );
};

const attrs = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
})``;

const Svg = styled(attrs)`
  cursor: pointer;
`;

export default RightArrow;
