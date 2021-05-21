import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/types/ProjectType';
import { CREATE_TASK_SAGA } from '../../redux/types/TaskType'
import { taskService } from '../../services/TaskService';
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';
import { notifyFunction } from '../../util/Notification/notificationJira';

function* createTaskSaga(action) {
    const { model } = action;
    try {
        yield call(() => taskService.createTask(model));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                id: model.projectId
            })
            notifyFunction('success', 'create task successful')
        }else{
            notifyFunction('error', 'create task fail')
        }
    } catch (err) {
        notifyFunction('error', 'create task fail')
        console.log(err.response.data)
    }
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}