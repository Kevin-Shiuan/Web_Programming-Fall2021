import { Button } from "@material-ui/core";
import { styled } from '@material-ui/styles';

const StyledButton = styled(Button)({
    color: '#ffffff',
    backgroundColor: '#009999',
    fontFamily: ['Quicksand'],
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#00aaaa',
    },
  });

export default function MyButton({displayText, variant, size, disable, onClickedFunction}){
    // const [startGame, setStartGame]=useState(false);
    return(
            <StyledButton variant={variant?variant:"contained"} 
                          size={size?size:"medium"}
                          disabled={disable}
                          onClick={ onClickedFunction?()=>{onClickedFunction()}:null }>
                {displayText}
            </StyledButton>
    )
}