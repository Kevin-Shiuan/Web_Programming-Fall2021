import Header from './Header';
import Body from './Body';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Theme } from '../theme.js';
import { ThemeProvider } from '@material-ui/styles';

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <StyledPaper elevation={3}>
          <Header />
          <Body />
        </StyledPaper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
