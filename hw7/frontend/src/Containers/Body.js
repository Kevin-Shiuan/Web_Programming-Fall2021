import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
//tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//table
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

//icons
import { PlusSquare, Search } from 'react-feather';

//table
import CustomTable from './Table';
import AlertDialog from './Dialog';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  padding: 1em;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
  height: 3rem;
`;

const ActionBar = styled.div`
  width: 100%;
  height: 80px;

`;

const ContentPaper = styled(Paper)`
  height: 150px;
  padding: 2em;
  padding-top: 1em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, data, addCardMessage, addRegularMessage, addErrorMessage, clearMessage, setTableData } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  //tabs
  const [tabValue, setTabValue] = useState(0);

  //Dialog
  const [open, setOpen] = useState(false);

  //other
  const [filter, setFilter] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryErrorMessage, setQueryErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSetOpen = (boolean) => {
    setOpen(boolean);
  };

  const closeAndClear =()=>{
    setOpen(false);
    handleDBClear();
  }

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };
  const handleTabs = (event, newValue) => {
    // console.log(newValue);
    setTabValue(newValue);
    handleGetAll();
  };

  const handleAdd = async () => {
    const {
      data: { message, card, rawData },
    } = await axios.post('/api/create-card', {
      "name": name,
      "subject": subject,
      "score": score
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    // console.log(rawData);
    setTableData(rawData);
    setFilter(true);
    // addRegularMessage("Table refreshed");
  };

  const handleQuery = async () => {
    const {
      data: { messages, message, rawData },
    } = await axios.get('/api/query-cards', {
      // params: {
      //   type: queryType,
      //   queryString,
      // },
      params: {
        type: queryType,
        input: queryString,
      },
    });

    if (!messages.length) {
      addErrorMessage(message);
      setQueryErrorMessage(message)
      setQueryError(true);
    }
    else addRegularMessage(...messages);
    setTableData(rawData);
    setFilter(true);
  };

  const handleConsoleClear = () => {
    clearMessage("Console cleared");
  };

  const handleDBClear = async () => {
    const {
      data: { message },
    } = await axios.delete('/api/clear-db');
    addCardMessage(message);
  };

  const handleGetAll = async () => {
    const {
      data: RawData,
    } = await axios.get('/api/get-all');
    setTableData(RawData);
    addRegularMessage("Table refreshed");
    setFilter(false);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  
  return (
    <Wrapper>
      <Row>
        <Tabs
          value={tabValue}
          onChange={handleTabs}
          aria-label="icon position tabs example"
          indicatorColor="secondary"
          textColor="inherit"
          // variant="fullWidth"
          >
            <Tab style={{width:"35vw"}} icon={<Search size={24} strokeWidth={2} />} iconposition="start" label="Query" wrapped/>
            <Tab style={{width:"35vw"}} icon={<PlusSquare size={24} strokeWidth={2} />} iconposition="start" label="Add" wrapped/>
        </Tabs>
      </Row>
      <Row>
        <TextWrapper>
            <Typography variant="subtitle1">ActionBar</Typography>
            {/* &nbsp;
            <Typography variant="caption"> - table-view of specific data</Typography> */}
        </TextWrapper>
      </Row>
      {tabValue?
      //add tab
      <ActionBar><Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject || !score}
          onClick={ handleAdd }
        >
          Add
        </Button>
        </Row></ActionBar>:
      //query tab
      <ActionBar><Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row></ActionBar>}
      
      {/* console and action */}
      <Row>
        <TextWrapper>
          <Typography variant="subtitle1">Console</Typography>
          &nbsp;
          <Typography variant="caption"> - what is done and the result</Typography>
        </TextWrapper>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          size="small"
          style={{whiteSpace: 'nowrap', minWidth:' max-content'}}
          // disabled={!name || !subject || !score}
          onClick={handleConsoleClear}
        >
          Clear Console
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>

      {/* table and action */}
      <Row>
        <TextWrapper>
          <Typography variant="subtitle1">Table</Typography>
          &nbsp;
          <Typography variant="caption"> - table-view of specific data</Typography>
        </TextWrapper>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          size="small"
          style={{whiteSpace: 'nowrap', minWidth:' max-content'}}
          // disabled={!name || !subject || !score}
          onClick={handleClickOpen}
        >
          Clear Database
        </Button>
        {filter && <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          style={{whiteSpace: 'nowrap', minWidth:' max-content'}}
          // disabled={!name || !subject || !score}
          onClick={handleGetAll}
        >
          {filter && !tabValue?"reset query":"show all data"}
        </Button>}
      </Row>
      {!(data.length===0)?<CustomTable data={data}/>: 
      <Row>
          <Typography variant="overline">{!queryError?"Database is empty":queryErrorMessage}</Typography>
      </Row>}
        
    <AlertDialog closeAndClear={closeAndClear} setOpen={handleSetOpen} open={open}/>
    </Wrapper>
  );
};

export default Body;
