import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField, Grid, Divider} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useHistory} from "react-router-dom";

const AddStudent = ({location}) => {
  const [formState, setFormState] = useState({
    studentEmail: '',
    studentName: '',
    courseId: 0
  })
  const history = useHistory();
  const addStudent = async () => {
    console.log("adding student")
  };
  const cancelButtonHandler = () => history.goBack();


  return (
    <div>
      <Typography variant="h4" component="h4" align="left" style={{padding: '20px 40px'}}>
        Add A Student
      </Typography>
      <Typography component="p" align="left" style={{padding: '0 40px'}}>
        Course Name: {location.courseName}
      </Typography>
      <Divider/>
      <Grid container spacing={2} style={{padding: '40px'}}>
        <Grid item align="left" md={5}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Student Email"
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