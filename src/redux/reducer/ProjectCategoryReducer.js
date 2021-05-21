import { GET_PROJECT_CATEGORY } from "../types/ProjectType"

const initialState = {
    projectCategory: []
}

const ProjectCategoryReducer = (state = initialState,action) => {
    switch (action.type) {

    case GET_PROJECT_CATEGORY:
        return { ...state, projectCategory: action.projectCategory}

    default:
        return state
    }
}

export default ProjectCategoryReducer