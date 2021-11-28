import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      {/* <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button> */}
    </Wrapper>
  );
};

export default Header;
