import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { GET_ALL_COMMENT_SAGA } from '../../redux/types/Comment';
import {  GET_TASK_DETAIL_SAGA, UPDATE_TASK_STATUS_SAGA } from '../../redux/types/TaskType';


export default function MainContent(props) {

    const dispatch = useDispatch()

    const { projectDetail } = props;
    const handleDragEnd = (result) => {
        const {source, destination, draggableId} = result;
        if(!destination){
            return
        }

        if(source.index === destination.index && source.droppableId === destination.droppableId){
            return
        }
        dispatch({
            type:UPDATE_TASK_STATUS_SAGA,
            model:{
                'taskId':  draggableId,
                'statusId': destination.droppableId,
            },
            id: projectDetail.id
        })
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetail.lstTask?.map((taskItem, index) => {
                    return <Droppable key={index} droppableId={taskItem.statusId}>
                        {(provided) => {
                            return <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                key={index} className="card" style={{ width: '17rem', maxHeight: '100%' }}>
                                <div className="card-header">
                                    {taskItem.statusName}
                                </div>
                                <div className="list-group list-group-flush">
                                    {renderTaskItemDetail(taskItem.lstTaskDeTail)}
                                </div>
                                {provided.placeholder}
                            </div>
                        }}
                    </Droppable>
                })
            }
        </DragDropContext>
    }

    const renderTaskItemDetail = (lstTaskDeTail) => {
        return lstTaskDeTail?.map((item, index) => {
            return <Draggable key={item.taskId.toString()} index={index} draggableId={item.taskId.toString()}>
                {(provided) => {
                    return <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() =>{
                            dispatch({
                                type:GET_TASK_DETAIL_SAGA,
                                taskId: item.taskId
                            })
                            dispatch({
                                type: GET_ALL_COMMENT_SAGA,
                                taskId: item.taskId
                            })
                        }}>
                        <p className='font-weight-bold'>
                            {item.taskName}
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <p className='text-danger'>{item.priorityTask.priority}</p>
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    {item.assigness.map((mem, index) => {
                                        return <div key={index} className='avatar'>
                                            <img src={mem.avatar} alt={mem.avatar} />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }}
            </Draggable>
        })
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>
    )
}
