import { Button, Input } from 'antd'
import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import {withFormik } from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux'
import { USER_LOGIN_SAGA } from '../../redux/types/UserType';
import {connect} from 'react-redux'


function UserLogin(props) {

    const {history} = useSelector( state => state.HistoryReducer);


    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: window.innerHeight }}>
                <div>
                    <h1>Jira Login</h1>
                </div>
                <div>
                    <Input size="large" placeholder="User Name" prefix={<UserOutlined />} className='mt-3 ' style={{ width: '300px' }} name='email' onChange={handleChange} />
                </div>
                    <span className='text-danger'>{errors.email}</span>
                <div>
                    <Input size="large" placeholder="Password" prefix={<LockOutlined />} className='mt-3' style={{ width: '300px' }} name='passWord' onChange={handleChange} />
                </div>
                <span className='text-danger'>{errors.passWord}</span>
                <div>
                    <Button className='mt-4' style={{ backgroundColor: 'rgb(102,117,223)', color: 'white' }} htmlType='submit'>Login</Button>
                    <Button className='mt-4 ml-3' style={{ backgroundColor: 'rgb(102,117,223)', color: 'white' }} onClick={() =>{
                        history.push('/home')
                    }}>Back to home</Button>
                </div>
                <div className='social mt-3 d-flex'>
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape='circle' size={'large'} >
                        <span className='font-weight-bold text-white'>f</span>
                    </Button>
                    <Button className='ml-3' type='primary' shape='circle' size={'large'}>
                        <TwitterOutlined />
                    </Button>
                </div>
            </div>
        </form>
    )
}

const userLoginWithFormik = withFormik({
    mapPropsToValues: () => (
        {
            email:'',
            passWord:''
        }
    ),


    validationSchema:Yup.object().shape({
        email:Yup.string().email('Invalid email').required('Email is required !'),
        passWord:Yup.string().min(5, 'Too Short!').max(10, 'Too Long!').required('Password is required !'),
    }),

    handleSubmit: (values, {props, setSubmitting }) => {
        props.dispatch({
            type:USER_LOGIN_SAGA,
            model:{
                email:values.email,
                passWord:values.passWord
            }
        })
    },

    displayName: 'User Login Form',
})(UserLogin);

export default connect() (userLoginWithFormik)