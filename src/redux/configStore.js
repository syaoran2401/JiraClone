
import {applyMiddleware,combineReducers, createStore} from 'redux';
import createMiddleWareSaga  from 'redux-saga'
import { rootSaga } from '../saga/rootSaga';
import CommentReducer from './reducer/CommentReducer';
import HistoryReducer from './reducer/HistoryReducer';
import ModalJiraReducer from './reducer/ModalJiraReducer';
import ProjectCategoryReducer from './reducer/ProjectCategoryReducer';
import ProjectDetailReducer from './reducer/ProjectDetailReducer';
import ProjectReducer from './reducer/ProjectReducer';
import TaskPriorityReducer from './reducer/TaskPriorityReducer';
import TaskReducer from './reducer/TaskReducer';
import TaskStatusReducer from './reducer/TaskStatusReducer';

import UserReducer from './reducer/UserReducer';





const middleWareSaga = createMiddleWareSaga();

export const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    HistoryReducer,
    ModalJiraReducer,
    ProjectCategoryReducer,
    ProjectDetailReducer,
    TaskReducer,
    TaskPriorityReducer,
    TaskStatusReducer,
    CommentReducer,
})


const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga)


export default store