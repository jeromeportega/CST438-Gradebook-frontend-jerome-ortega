import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField, Grid, Divider} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useHistory} from "react-router-dom";
import {SERVER_URL} from '../../constants.js';
import axios from 'axios';

const AddStudent = () => {
  const [formState, setFormState] = useState({
    studentEmail: '',
    studentName: '',
    statusCode: 0
  });
  const history = useHistory();
  const addStudent = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/students`, formState);
      if (response.status === 200) {
        console.log('Student Added!');
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const cancelButtonHandler = () => history.goBack();

  const onStudentEmailChange = (e) => setFormState({
    ...formState,
    studentEmail: e.currentTarget.value,
  });
  const onStudentNameChange = (e) => setFormState({
    ...formState,
    studentName: e.currentTarget.value,
  });


  return (
    <div>
      <Typography variant="h4" component="h4" align="left" style={{padding: '20px 40px'}}>
        Add A Student
      </Typography>
      <Divider/>
      <Grid container spacing={2} style={{padding: '40px'}}>
        <Grid item align="left" md={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Student Email"
            onChange={onStudentEmailChange}
            value={formState.studentEmail}
            required
            fullWidth
          />
        </Grid>
        <Grid item md={7}/>
        <Grid item align="left" md={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Student Name"
            onChange={onStudentNameChange}
            value={formState.studentName}
            required
            fullWidth
          />
        </Grid>
        <Grid item md={7}/>
        <Grid item align="left" md={1}>
          <Button id="Submit" variant="outlined" color="primary" onClick={addStudent}>
            Submit
          </Button>
        </Grid>
        <Grid item align="left" md={1}>
          <Button id="Submit" variant="outlined" color="warning" onClick={cancelButtonHandler}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  )

}

export default AddStudent;