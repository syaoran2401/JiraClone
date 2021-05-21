import { CHANGE_ASSIGNESS, CHANGE_TASK_MODEL, GET_ALL_TASK_TYPE, GET_TASK_DETAIL, REMOVE_ASSIGNESS } from "../types/TaskType"

const initialState = {
    taskDetail: {
        "listUserAsign": [
            0
        ],
        "taskName": "string",
        "description": "string",
        "statusId": "string",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "projectId": 0,
        "typeId": 0,
        "priorityId": 0
    },

    arrTaskType: [],
    taskListDetail: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 6,
                "avatar": "https://ui-avatars.com/api/?name=khải",
                "name": "khải",
                "alias": "khai"
            },
        ],
        "lstComment": [],
        "taskId": 167,
        "taskName": "efefttttttttt",
        "alias": "efefttttttttt",
        "description": "<p>111111111</p>",
        "statusId": "2",
        "originalEstimate": 10,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 10,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 201
    }
}

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TASK_TYPE: {
            return { ...state, arrTaskType: action.arrTaskType }
        }


        case GET_TASK_DETAIL: {
            return { ...state, taskListDetail: action.taskListDetail }
        }

        case CHANGE_TASK_MODEL: {
            const { name, value } = action
            return { ...state, taskListDetail: { ...state.taskListDetail, [name]: value } }
        }

        case CHANGE_ASSIGNESS:{
            state.taskListDetail.assigness = [...state.taskListDetail.assigness, action.assigness]
            return {...state}
        }

        case REMOVE_ASSIGNESS:{
            state.taskListDetail.assigness = [...state.taskListDetail.assigness.filter(mem => mem.id !== action.userId)];
            return {...state}
        }

        default:
            return state
    }
}

export default TaskReducer