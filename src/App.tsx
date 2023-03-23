import styled from 'styled-components';
import { useAppSelector } from './app/hooks';
import { MultiPage, Start } from './components';

const App = () => {
  const { isStarted } = useAppSelector(state => state.quest);
  return <Container>{!isStarted ? <Start /> : <MultiPage />}</Container>;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 89px 196px 104px 200px;
`;

export default App;
