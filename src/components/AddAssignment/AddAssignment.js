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
import Cookies from "js-cookie";

const AddAssignment = () => {
  // Using history hook so we can use the cancel button to go back a page.
  const history = useHistory();
  const defaultFormState = {
    assignmentName: '',
    dueDate: moment().subtract(1, 'day'),
    courseId: ''
  }

  // Setting up state for the form.
  const [formState, setFormState] = useState(defaultFormState);

  /**
   * Validates the form and prevents submission if it doesn't fulfill requirements.
   * @returns {boolean}
   */
  const validateFormEntries = () => {
    if (!formState.assignmentName) {
      return false;
    }

    if (!formState.courseId) {
      return false;
    }

    return true;
  }

  /**
   * This method performs the POST request to add the assignment.
   * @returns {Promise<void>}
   */
  const addAssignment = async () => {
    if (validateFormEntries()) {
      try {
        const token = Cookies.get('XSRF-TOKEN');
        const response = await axios.post(`${SERVER_URL}/assignment`, {
          ...formState,
          dueDate: formState.dueDate.format('YYYY-MM-DD'),
        }, {
          headers: {
            "X-XSRF-TOKEN": token,
          }
        });
        if (response.status === 200) {
          console.log('Assignment Added!');
          // Go back to assignment list after saving assignment.
          history.push('/');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // This method basically returns to the last page if the cancel button is clicked.
  const cancelButtonHandler = () => history.goBack();

  // The following methods handle state changes to the form state.
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
      courseId: e.currentTarget.value,
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
            id="assignment-name-input"
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
                renderInput={(params) => <TextField {...params} id="assignment-due-date-picker"/>}
              /></LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item md={7}/>
        <Grid item md={5}>
          <TextField
            id="course-id-input"
            variant="outlined"
            label="Course Name"
            onChange={onCourseChange}
            value={formState.courseId}
            required
            fullWidth
          />
        </Grid>
        <Grid item md={7}/>
        <Grid item md={4} align="left">
          <Button id="add-assignment-submit-button" variant="outlined" color="primary" onClick={addAssignment}
                  style={{marginRight: 10}}>
            Submit
          </Button>
          <Button id="add-assignment-cancel-button" variant="outlined" color="warning" onClick={cancelButtonHandler}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddAssignment;