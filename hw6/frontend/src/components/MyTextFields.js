import { TextField } from "@material-ui/core";
import { styled } from '@material-ui/styles';

const StyledTextField = styled(TextField)({
    // backgroundColor: '#f8f8f833',
    '& label': {
        fontFamily: ['Quicksand'],
        fontWeight: 400,
        color: '#006666',
    },
    '& label.Mui-focused': {
        fontFamily: ['Quicksand'],
        fontWeight: 700,
        color: '#009999',
    },
    '& placeholder':{
        fontFamily: ['Quicksand'],
        fontWeight: 500,
    },
    // '& helperText':{
    //     fontFamily: ['Quicksand'],
    //     fontWeight: 700,
    // },
    '& input':{
        fontFamily: ['Quicksand'],
        fontWeight: 500,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#006666',
      },
      '&:hover fieldset': {
        borderColor: '#00aaaa',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00aaaa',
      },
    },
  });

export default function MyTextField({onchangeFunction, invalid}){
    // const [startGame, setStartGame]=useState(false);
    // let error=false;
    return(
            <StyledTextField
                variant="outlined"
                margin="normal" 
                label="Your Guess"
                placeholder="1~100" 
                helperText={invalid?"Only number is available":" "}
                style={{width: '15rem'}}
                onChange={(e)=>{
                    onchangeFunction(e.target.value);
                }}
            />
    )
}