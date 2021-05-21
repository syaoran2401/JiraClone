import { GET_ALL_TASK_STATUS } from "../types/StatusType"

const initialState = {
    arrTaskStatus :[]
}

const TaskStatusReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_TASK_STATUS:
        return { ...state, arrTaskStatus: action.arrTaskStatus }

    default:
        return state
    }
}


export default TaskStatusReducer