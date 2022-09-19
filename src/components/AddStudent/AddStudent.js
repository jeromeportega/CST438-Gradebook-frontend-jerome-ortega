import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField, Grid, Divider, FormControl} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useHistory} from "react-router-dom";
import {SERVER_URL} from '../../constants.js';
import axios from 'axios';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

const AddStudent = () => {
  const [formState, setFormState] = useState({
    assignmentName: '',
    dueDate: moment(),
    courseName: ''
  });
  const history = useHistory();

  const validateFormEntries = () => {
    if (!formState.assignmentName) {
      return false;
    }

    if (!formState.courseName) {
      return false;
    }

    return true;
  }

  const addStudent = async () => {
    if (validateFormEntries()) {
      try {
        const response = await axios.post(`${SERVER_URL}/assignments`, {
          ...formState,
          dueDate: formState.dueDate.format('YYYY-MM-DD'),
        });
        if (response.status === 200) {
          console.log('Student Added!');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };


  const cancelButtonHandler = () => history.goBack();

  const onAssignmentNameChange = (e) => setFormState({
    ...formState,
    assignmentName: e.currentTarget.value,
  });
  const onDueDateChange = (dueDate) => {
    setFormState({
      ...formState,
      dueDate,
    });
  }
  const onCourseChange = (e) => {
    setFormState({
      ...formState,
      courseName: e.currentTarget.value,
    });
  }


  return (
    <div>
      <Typography variant="h4" component="h4" align="left" style={{padding: '20px 40px'}}>
        Add an Assignment
      </Typography>
      <Divider/>
      <Grid container spacing={2} style={{padding: '40px'}}>
        <Grid item align="left" md={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Assignment Name"
            onChange={onAssignmentNameChange}
            value={formState.assignmentName}
            required
            fullWidth
          />
        </Grid>
        <Grid item md={7}/>
        <Grid item align="left" md={5}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Due Date"
                inputFormat="MM/DD/YYYY"
                value={formState.dueDate.toDate()}
                onChange={onDueDateChange}
                required
                renderInput={(params) => <TextField {...params} />}
              /></LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item md={7}/>
        <Grid item md={5}>
          <TextField
            id="course-name"
            variant="outlined"
            label="Course Name"
            onChange={onCourseChange}
            value={formState.courseName}
            required
            fullWidth
          />
        </Grid>
        <Grid item md={7}/>
        <Grid item md={4} align="left">
          <Button id="Submit" variant="outlined" color="primary" onClick={addStudent} style={{marginRight: 10}}>
            Submit
          </Button>
          <Button id="Submit" variant="outlined" color="warning" onClick={cancelButtonHandler}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddStudent;