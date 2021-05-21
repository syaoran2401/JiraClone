
import { Switch, useHistory } from 'react-router-dom'
import IndexJiraClone from './ProjectDetail/IndexJiraClone';
import JiraTemplate from './Template/JiraTemplate';
import './index.css'
import LoginTemplate from './Template/LoginTemplate';
import UserLogin from './page/UserLogin/UserLogin';
import ProjectManagement from './page/ProjectManagement/ProjectManagement';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HISTORY } from './redux/types/UserType';
import DrawerJira from './HOC/DrawerJira/DrawerJira';
import CreateProject from './page/CreateProject/CreateProject';
import HomePage from './page/HomePage/HomePage';
import UserSignUp from './page/UserSignUp/UserSignUp';




function App() {

  const history = useHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: HISTORY,
      history: history
    })
  }, [])

  return (
    <>
    <DrawerJira/>
    <Switch>
      <JiraTemplate exact path='/home' Component={HomePage}/>
      <JiraTemplate exact path='/mainpage' Component={IndexJiraClone} />
      <JiraTemplate exact path='/createproject' Component={CreateProject}/>
      <JiraTemplate exact path='/projectmanagement' Component={ProjectManagement} />
      <LoginTemplate exact path='/login' Component={UserLogin} />
      <LoginTemplate exact path='/signup' Component={UserSignUp} />
      <JiraTemplate exact path='/projectDetail/:projectId' Component={IndexJiraClone}/>
      <JiraTemplate exact path='/' Component={HomePage} />
    </Switch>
  </>
  );
}

export default App;
