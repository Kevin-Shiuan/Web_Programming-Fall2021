import { debounce } from 'lodash'
import { mapContext } from '../context/mapContext';
import { Grid, Box, Typography, Paper, Avatar, Chip, Input, TextField, Button, Tooltip, Autocomplete } from '@mui/material';
import { useRef, useContext } from 'react';


function Search() {

    const [mapInfo, setMapInfo] = useContext(mapContext)

    let inputRef = useRef(null);

    const handleInput = () => {
        // console.log(inputRef.current.children[1].children[0].value)
        setMapInfo({ ...mapInfo, inputValue: inputRef.current.children[1].children[0].value });
    }
    const handleResultClick = (dataid)=>{
        // console.log(dataid);
        setMapInfo({ ...mapInfo, idtosearch: dataid, inputValue: '', searchResults:[] });
        // inputRef.current.children[1].children[0].value = '';
    }
    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={(mapInfo.searchResults && mapInfo.inputValue)?mapInfo.searchResults:[]}
            getOptionLabel={(option) => option.description}
            renderOption={(props, option, { selected }) => (
                <Box {...props} dataid={option.place_id} onClick={(e) => {
                    e.preventDefault();
                    // console.log(option.place_id);
                    handleResultClick(option.place_id);
                }} >
                    <Typography variant="body2" >
                        {option.description}
                    </Typography>
                </Box>
            )}
            renderInput={(params) => <TextField {...params} ref={inputRef} label="freeSolo" />}
            onInputChange={ debounce(handleInput, 1000) }
            // onChange={(e,v)=>console.log(e.target)}
        />
    )
  }
  
  export default Search;