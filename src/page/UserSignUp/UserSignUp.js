import React from 'react'
import { Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { withFormik } from 'formik';
import { connect, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { USER_SIGN_UP_SAGA } from '../../redux/types/UserType';

function UserSignUp(props) {
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;
    const { history } = useSelector(state => state.HistoryReducer)
    
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: window.innerHeight }}>
                <div>
                    <h1>Jira Sign Up</h1>
                </div>
                <div>
                    <Input className='mt-3' size="large" placeholder="Name" prefix={<UserOutlined />} style={{ width: '300px' }} onChange={handleChange} name='name' />
                </div>
                <span className="text-danger">{errors.name}</span>
                <div>
                    <Input className='mt-3' size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} style={{ width: '300px' }} onChange={handleChange} name='phoneNumber' />
                </div>
                <span className="text-danger">{errors.phoneNumber}</span>
                <div>
                    <Input className='mt-3' size="large" placeholder="Email" prefix={<MailOutlined />} style={{ width: '300px' }} onChange={handleChange} name='email' />
                </div>
                <span className="text-danger">{errors.email}</span>

                <div>
                    <Input className='mt-3' size="large" placeholder="Password" prefix={<LockOutlined />} style={{ width: '300px' }} onChange={handleChange} name='passWord' />
                </div>
                <span className="text-danger">{errors.password}</span>


                <div className='mt-3'>
                    <Button style={{ backgroundColor: 'rgb(102,117,223)', color: 'white' }} htmlType='submit'>Sign Up</Button>
                    <Button className='mx-3' style={{ backgroundColor: 'rgb(102,117,223)', color: 'white' }} onClick={() => {
                        history.push('/home')
                    }}>Back To Home</Button>
                </div>
            </div>
        </form>
    )
}



const userSignUpWithFormik = withFormik({
    mapPropsToValues: () => ({
        name: '',
        phoneNumber: '',
        email: '',
        passWord: ''
    }),


    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name Required !'),
        phoneNumber: Yup.string().required('Phone Number Required !'),
        email: Yup.string().email('Invalid email').required('Email Required !'),
        passWord: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Password Required !'),

    }),

    handleSubmit: (values, { props }) => {
        props.dispatch({
            type: USER_SIGN_UP_SAGA,
            model: {
                "email": values.email,
                "passWord": values.passWord,
                "name": values.name,
                "phoneNumber": values.phoneNumber
            }
        })
    },

    displayName: 'User SignUp Form',
})(UserSignUp);


export default connect()(userSignUpWithFormik)