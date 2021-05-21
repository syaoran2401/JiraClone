import { Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom";
import imgDownload from '../../assets/img/download.jfif'
import { USER_LOGIN_INFO } from '../../redux/types/UserType';



export default function MenuJira() {



  const { userLogin } = useSelector(state => state.UserReducer);
  const history = useHistory();



  return (
    <div className="menu">
      <div className='d-flex justify-content-end mt-2'>
        <Button type='primary' className='mt-3 mx-2' onClick={()=>{
          history.push('/signup')
        }}>Sign Up</Button>
        {!localStorage.getItem(USER_LOGIN_INFO) ? <Button type='primary' className='mt-3 mr-4' onClick={() => {
          history.push('/login');
        }}>Login</Button> : <Button type='danger' className='mt-3 mr-4' onClick={() => {
          localStorage.clear();
          history.push('/login')
        }}>Log Out</Button>}
      </div>

      {localStorage.getItem(USER_LOGIN_INFO) ?  <div className="avatar d-flex align-items-center justify-content-center mt-4">
        <img src={userLogin.avatar} alt={userLogin.avatar} />
        <p className='m-0 ml-2'>{userLogin.name}</p>
      </div> :''}

      <div className="account">
        <div className="avatar">
          <img src={imgDownload} alt='download' />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink to='/home' activeClassName='active font-weight-bold text-pirmary' >Cyber Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
        
          <NavLink to='/createproject' activeClassName='active font-weight-bold text-pirmary'>Create Project</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to='/projectmanagement' activeClassName='active font-weight-bold text-pirmary'>Project Management</NavLink>
        </div>
      </div>
   
    </div>

  )
}
