import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Slider, Row, Col } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import { GET_PRIORITY_SAGA } from '../../redux/types/PriorityType';
import { CREATE_TASK_SAGA, GET_ALL_TASK_TYPE_SAGA } from '../../redux/types/TaskType';
import { GET_ALL_TASK_STATUS_SAGA } from '../../redux/types/StatusType';
import { GET_ALL_PROJECT_SAGA } from '../../redux/types/ProjectType';
import { GET_USER_BY_PROJECTID_SAGA} from '../../redux/types/UserType';
import { SET_SUBMIT_FORM_EDIT } from '../../redux/types/JiraType';

function CreateTaskForm(props) {

    const dispatch = useDispatch();
    const { arrPriority } = useSelector(state => state.TaskPriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskReducer);
    const { arrTaskStatus } = useSelector(state => state.TaskStatusReducer);
    const { projectList } = useSelector(state => state.ProjectReducer);
    const { arrUserInProject } = useSelector(state => state.UserReducer);

    const userOption = arrUserInProject?.map((mem, index) => {
        return { value: mem.userId.toString(), label: mem.name }
    })


    const [timeTracking, setTimeTracking] = useState({
        timeSpend:'',
        timeRemaining:''
    })





    const { handleChange,handleSubmit,values,setFieldValue} = props;




    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_STATUS_SAGA
        })

        dispatch({
            type:SET_SUBMIT_FORM_EDIT,
            submitFunction:handleSubmit
        })
   
  
    }, [])

    const renderAllProject = () => {
        return projectList.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectName}</option>
        })
    }

    const renderPriority = () => {
        return arrPriority.map((item, index) => {
            return <option value={item.priorityId} key={index}>{item.description}</option>
        })
    }

    const renderTaskType = () => {
        return arrTaskType.map((item, index) => {
            return <option value={item.id} key={index}>{item.taskType}</option>
        })
    }

    const renderTaskStatus = () => {
        return arrTaskStatus.map((item, index) => {
            return <option value={item.statusId} key={index}>{item.statusName}</option>
        })
    }


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='form-group'>
                        <p className='mb-2'>Project</p>
                        <select name='projectId' className='form-control' onChange={(e)=>{
                             dispatch({
                                type: GET_USER_BY_PROJECTID_SAGA,
                                projectId: e.target.value
                            })
                            setFieldValue('projectId', e.target.value)
                        }}>
                            {renderAllProject()}
                        </select>
                    </div>

                    <div className='form-group'>
                        <p className='mb-2'>Task name</p>
                        <input name='taskName' type="text" className='form-control' onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <p className='mb-2'>Status ID</p>
                        <select name='statusId' className='form-control' onChange={handleChange}>
                            {renderTaskStatus()}
                        </select>
                    </div>

                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-6'>
                                <p className='mb-2'>Priority</p>
                                <select name='priorityId' className='form-control' onChange={handleChange}>
                                    {renderPriority()}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p className='mb-2'>Task type</p>
                                <select name='typeId' className='form-control' onChange={handleChange}>
                                    {renderTaskType()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-6'>
                                <p className='mb-2'>Assignees</p>
                                <Select
                                 mode="multiple"
                                    style={{ width: '100%' }}
                                    options={userOption}
                                    placeholder="Please select"
                                    // optionFilterProp='label'
                                    onChange={(value)=>{
                                        setFieldValue('listUserAsign', value)
                                    }}
                                />
                            </div>
                            <div className='col-6'>
                                <p className='mb-2'>Time Tracking</p>
                                <Row>
                                    <Col style={{ width: '100%' }} span={40}>
                                        <Slider value={timeTracking.timeSpend} max={Number(timeTracking.timeSpend) + Number(timeTracking.timeRemaining)} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <div className='row'>
                                    <div className='col-6 font-weight-bold text-left'>{timeTracking.timeSpend} logged</div>
                                    <div className='col-6 font-weight-bold text-right'>{timeTracking.timeRemaining} remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-6'>
                                <p className='mb-2'>Original Estimate</p>
                                <input name='originalEstimate' type="number" className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <p className='mb-2'>Time spent</p>
                                        <input name='timeTrackingSpent' className='form-control' min={1} max={20} style={{ width: '100%' }} defaultValue={0} onChange={(e)=>{
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeSpend:e.target.value
                                            })
                                            setFieldValue('timeTrackingSpent',e.target.value )
                                        }}  />
                                    </div>
                                    <div className='col-6'>
                                        <p className='mb-2'>Time remaining</p>
                                        <input name='timeTrackingRemaining' className='form-control'min={1} max={20} style={{ width: '100%' }} defaultValue={0} onChange={(e)=>{
                                             setTimeTracking({
                                                ...timeTracking,
                                                timeRemaining:e.target.value
                                            })
                                            setFieldValue('timeTrackingRemaining',e.target.value )
                                        }}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className='mb-2'>Description</p>
                        <Editor name="description"
                            // initialValue={values.description}
                            value={values.description}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

const createTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {arrTaskStatus,arrPriority,arrTaskType} = props
        return {
            taskName:'',
            description: "",
            statusId: arrTaskStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: '',
            projectId:'',
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },


    handleSubmit: (values, { props}) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            model: values
        })
    },

    displayName: 'Create Task Form',
})(CreateTaskForm);

const mapStateToProps = state => {
    return {
        arrTaskStatus: state.TaskStatusReducer.arrTaskStatus,
        arrPriority: state.TaskPriorityReducer.arrPriority,
        arrTaskType: state.TaskReducer.arrTaskType
    }
}

export default connect(mapStateToProps)(createTaskForm)