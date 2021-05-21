import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRIORITY_SAGA } from '../../redux/types/PriorityType';
import { GET_ALL_TASK_STATUS_SAGA } from '../../redux/types/StatusType';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, GET_ALL_TASK_TYPE_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_ASSIGNESS } from '../../redux/types/TaskType';
import ReactHtmlParser from 'react-html-parser';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import { ADD_COMMENT_SAGA, DELETE_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../redux/types/Comment';


export default function ModalTaskDetail() {
    const dispatch = useDispatch()

    const { taskListDetail } = useSelector(state => state.TaskReducer);
    const { arrTaskType } = useSelector(state => state.TaskReducer);
    const { arrTaskStatus } = useSelector(state => state.TaskStatusReducer);
    const { projectDetail } = useSelector(state => state.ProjectDetailReducer);
    const { arrPriority } = useSelector(state => state.TaskPriorityReducer);
    const { comment } = useSelector(state => state.CommentReducer);
    const { userLogin } = useSelector(state => state.UserReducer);
    const [visibleCommentEditor, setVisibleCommentEditor] = useState(false);
    const [visibleUserCommentEditor, setVisibleUserCommentEditor] = useState(false);
    const [visibleUserEditComment, setVisibleUserEditComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState()
    const [content, setContent] = useState(taskListDetail.description);
    const [userCommentContent, setUserCommentContent] = useState(taskListDetail.description)
    useEffect(() => {
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_STATUS_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })

    }, [])


    const renderArrTaskType = () => {
        return arrTaskType.map((item, index) => {
            return <option value={item.id} key={index}>{item.taskType}</option>
        })
    }

    const renderArrTaskStatus = () => {
        return arrTaskStatus.map((item, index) => {
            return <option value={item.statusId} key={index}>{item.statusName}</option>
        })
    }

    const renderAssigness = () => {
        return taskListDetail.assigness?.map((item, index) => {
            return <div className='col-6' key={index}>
                <div className="item">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="avatar">
                            <img src={item.avatar} alt={item.avatar} />
                        </div>
                        <p className="name">
                            {item.name}
                        </p>
                    </div>
                    <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: REMOVE_ASSIGNESS,
                            userId: item.id
                        })
                    }} />
                </div>
            </div>
        })
    }

    const renderPriority = () => {
        return arrPriority?.map((item, index) => {
            return <option key={index} value={item.priorityId}>{item.description}</option>
        })
    }

    const renderTimeTracking = () => {
        const { timeTrackingRemaining, timeTrackingSpent } = taskListDetail;
        const maxTimeAvalable = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
        const percent = Math.round(Number(timeTrackingSpent) / maxTimeAvalable * 100);
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={maxTimeAvalable} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{Number(timeTrackingSpent)} logged</p>
                            <p className="estimate-time">{Number(timeTrackingRemaining)} estimated</p>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6'>
                        <input type="text" name='timeTrackingSpent' className='form-control' onChange={(e) => handleChange(e)} />
                    </div>

                    <div className='col-6'>
                        <input type="text" name='timeTrackingRemaining' className='form-control' onChange={(e) => handleChange(e)} />
                    </div>
                </div>

            </div>
        )
    }

    const renderTaskDescription = () => {
        let html = ReactHtmlParser(taskListDetail.description)
        return <div>
            {visibleCommentEditor ? <>
                <Editor
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => {
                        setContent(content)
                    }}
                />
                <div className='mt-2'>
                    <Button type='primary' className='mr-2' onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODEL,
                            name: 'description',
                            value: content
                        })
                        setVisibleCommentEditor(false)
                    }}>Save</Button>
                    <Button type='primary' onClick={() => {
                        setVisibleCommentEditor(false)
                    }}>Cancel</Button>
                </div>
            </> : <div onClick={() => {
                setVisibleCommentEditor(true);

            }}>
                {html}
            </div>
            }
        </div>
    }

    const renderUserComment = () => {
        return comment.map((item, index) => {
            const userCommentHtml = ReactHtmlParser(item.contentComment)
            return <div className="lastest-comment" key={index}>
                <div className="comment-item">
                    <div className="display-comment my-3" style={{ display: 'flex' }}>
                        <div className="avatar">
                            <img src={item.user.avatar} alt={item.user.avatar} />
                        </div>
                        <div>
                            <div>
                                {visibleUserEditComment && selectedComment.id === item.id ? <>
                                    <Editor
                                        name="description"
                                        initialValue={item.contentComment}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onEditorChange={(content) => {
                                            setUserCommentContent(content)
                                        }}
                                    />
                                    <button onClick={() => {
                                        dispatch({
                                            type: UPDATE_COMMENT_SAGA,
                                            id: item.id,
                                            contentComment: userCommentContent,
                                            taskId: item.taskId
                                        })
                                        setVisibleUserEditComment(false)
                                    }}>Save</button>
                                    <button onClick={() => {
                                        setVisibleUserEditComment(false)
                                    }}>Cancel</button>
                                </> : <>{userCommentHtml}</>}


                                <div>
                                    <span className="mr-2" style={{ color: 'rgb(146, 147, 152)', cursor: 'pointer' }} onClick={() => {
                                        setSelectedComment(item);
                                        setVisibleUserEditComment(true)
                                    }}>Edit</span>
                                    •
                                     <span className="mx-2" style={{ color: 'rgb(146, 147, 152)', cursor: 'pointer' }} onClick={() => {
                                        dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            id: item.id,
                                            taskId: item.taskId
                                        })
                                    }}>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODEL,
            name, value
        })
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select value={taskListDetail.id} name='typeId' onChange={(e) => handleChange(e)}>
                                {renderArrTaskType()}
                            </select>
                            <span>{taskListDetail.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description my-3">
                                        <p className='font-weight-bold'>Description</p>
                                        {renderTaskDescription()}
                                    </div>

                                    <div className="comment">
                                        <h6>Comment</h6>
                                        {visibleUserCommentEditor ? <>
                                            <Editor
                                                name='description'
                                                initialValue=""
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar: 'undo redo | formatselect | ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat | help',
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                                onEditorChange={(content) => {
                                                    setUserCommentContent(content)
                                                }}
                                            />
                                            <div>
                                                <button className='btn btn-primary' onClick={() => {
                                                    dispatch({
                                                        type: ADD_COMMENT_SAGA,
                                                        model: {
                                                            taskId: taskListDetail.taskId,
                                                            contentComment: userCommentContent
                                                        },
                                                        taskId: taskListDetail.taskId
                                                    })
                                                    setVisibleUserCommentEditor(false)
                                                }}>Save</button>
                                                <button className='btn btn-danger' onClick={() => {
                                                    setVisibleUserCommentEditor(false)
                                                }}>Close</button>
                                            </div>
                                        </> : <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={userLogin.avatar} alt={userLogin.avatar} />
                                            </div>
                                            <div className="input-comment">
                                                <input className='form-control' type="text" placeholder="Add a comment ..." onClick={() => {
                                                    setVisibleUserCommentEditor(true)
                                                }} />
                                            </div>
                                        </div>}
                                        {renderUserComment()}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" value={taskListDetail.statusId} name='statusId' onChange={(e) => handleChange(e)}>
                                            {renderArrTaskStatus()}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex' }} className='container'>
                                            <div className='row'>
                                                {renderAssigness()}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                                            <Select
                                                // hàm filter => lọc member đã có ra khỏi thẻ option
                                                options={projectDetail.members?.filter(member => {
                                                    let index = taskListDetail.assigness?.findIndex(assigness => assigness.id === member.userId);
                                                    if (index !== -1) {
                                                        return false
                                                    }
                                                    return true;
                                                })?.map((mem) => {
                                                    return { value: mem.userId, label: mem.name }
                                                })}
                                                optionFilterProp='label'
                                                style={{ width: '100%' }}
                                                className='form-control'
                                                name='listUser'
                                                value='+ Add More'
                                                onSelect={(value) => {
                                                    if (value == '0') {
                                                        return
                                                    }

                                                    let userSelect = projectDetail.members.find(mem => mem.userId == value);
                                                    userSelect = { ...userSelect, id: userSelect.userId }
                                                    dispatch({
                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                        actionType: CHANGE_ASSIGNESS,
                                                        assigness: userSelect
                                                    })
                                                }}>

                                            </Select>
                                        </div>
                                    </div>
                                    <div className="priority my-3" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className='form-control' name='priorityId' onChange={(e) => handleChange(e)}>
                                            {renderPriority()}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours" value={taskListDetail.originalEstimate} name='originalEstimate' onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

