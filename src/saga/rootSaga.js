
import { all } from 'redux-saga/effects'
import { theoDoiAddCommentSaga, theoDoiDeleteCommentSaga, theoDoiGetAllCommentSaga, theoDoiUpdateCommentSaga } from './CommentSaga/CommentSaga'
import { theoDoiGetAllPrioritySaga } from './ProjectSaga/PrioritySaga'
import { theoDoiCreateProjectSaga, theoDoiDeleteProject, theoDoiGetAllProjectSaga, theoDoiGetProjectCategorySaga, theoDoiGetProjectDetail, theoDoiRemoveUserProjectSaga } from './ProjectSaga/ProjectSaga'
import { theoDoiProjectUpdateSaga } from './ProjectSaga/ProjectUpdateSaga'
import { theoDoiCreateTaskSaga } from './TaskSaga/CreateTaskSaga'
import { theoDoiGetTaskListDetailSaga, theoDoiHandleChangePostAPI } from './TaskSaga/TaskListDetailSaga'
import { theoDoiGetAllTaskStatusSaga, theoDoiUpdateTaskStatusSaga } from './TaskSaga/TaskStatusSaga'
import { theoDoiGetAllTaskTypeSaga } from './TaskSaga/TaskTypeSaga'
import { theoDoiGetAllUserSaga, theoDoiUserSignInSaga,theoDoiAssignUserSaga, theoDoiSeachUserSaga, theoDoiGetUserInProject, theoDoiUserSignUpSaga } from './UserSaga/UserSaga'




export function * rootSaga(){
    yield all([
        theoDoiUserSignInSaga(),
        theoDoiUserSignUpSaga(),
        theoDoiGetAllProjectSaga(),
        theoDoiRemoveUserProjectSaga(),
        theoDoiGetAllUserSaga(),
        theoDoiAssignUserSaga(),
        theoDoiSeachUserSaga(),
        theoDoiGetProjectCategorySaga(),
        theoDoiProjectUpdateSaga(),
        theoDoiDeleteProject(),
        theoDoiCreateProjectSaga(),
        theoDoiGetAllPrioritySaga(),
        theoDoiGetAllTaskTypeSaga(),
        theoDoiGetAllTaskStatusSaga(),
        theoDoiGetUserInProject(),
        theoDoiCreateTaskSaga(),
        theoDoiGetProjectDetail(),
        theoDoiUpdateTaskStatusSaga(),
        theoDoiGetTaskListDetailSaga(),
        theoDoiHandleChangePostAPI(),
        theoDoiGetAllCommentSaga(),
        theoDoiAddCommentSaga(),
        theoDoiUpdateCommentSaga(),
        theoDoiDeleteCommentSaga(),
  
    ])
}