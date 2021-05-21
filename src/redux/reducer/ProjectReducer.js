import { GET_ALL_PROJECT } from "../types/ProjectType"


const initialState = {
    projectList:[
        
    ]
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_PROJECT:
        return { ...state, projectList:action.projectList }

    default:
        return state
    }
}

export default ProjectReducer