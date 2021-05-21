import { GET_PROJECT_DETAIL,EDIT_PROJECT } from "../types/ProjectType"

const initialState = {
    projectEditDetail:'',
    projectDetail:''
}

const ProjectDetailReducer = (state = initialState, action) => {
    switch (action.type) {

    
    case EDIT_PROJECT:{
        return  { ...state, projectEditDetail: action.projectEditDetail }
    }

    case GET_PROJECT_DETAIL:
        return { ...state, projectDetail: action.projectDetail }

    default:
        return state
    }
}

export default ProjectDetailReducer