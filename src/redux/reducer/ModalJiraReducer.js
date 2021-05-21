import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM, SET_SUBMIT_FORM_EDIT } from "../types/JiraType"

const initialState = {
    visible: false,
    title: '',
    componentContentDrawer: <p>123345</p>,
    callBackSubmit: (value) => {
        alert('submit')
    }
}

const ModalJiraReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            return { ...state, visible: true }

        case CLOSE_DRAWER:
            return { ...state, visible: false }

        case OPEN_FORM:
            return { ...state, componentContentDrawer: action.componentContentDrawer, title: action.title, visible:true }

        case SET_SUBMIT_FORM_EDIT:
            return { ...state, callBackSubmit: action.submitFunction }
        default:
            return state
    }
}

export default ModalJiraReducer