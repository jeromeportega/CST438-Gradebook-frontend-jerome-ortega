import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Gradebook from './components/Gradebook/Gradebook';
import Assignment from './components/Assignment/Assignment';
import AddStudent from './components/AddStudent/AddStudent';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Gradebook
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Assignment}/>
          <Route path='/gradebook' component={Gradebook}/>
          <Route path='/add-student' component={AddStudent}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
