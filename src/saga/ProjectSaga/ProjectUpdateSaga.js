import { takeLatest, call } from 'redux-saga/effects'
import { UPDATE_PROJECT_SAGA } from '../../redux/types/ProjectType'
import { projectService } from '../../services/ProjectService';
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';


function* projectUpdateSaga(action) {
    const { model } = action;
    try {
        yield call(() => projectService.updateProject(model.id, model))
        if (STATUS_CODE.SUCCESS) {

        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiProjectUpdateSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, projectUpdateSaga)
}