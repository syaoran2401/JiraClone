import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '../../redux/types/TaskType'
import { taskService } from '../../services/TaskService'
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';

function * getAllTaskTypeSaga(){
    try{
        const {data} = yield call( () => taskService.getAllTaskType());
        if(STATUS_CODE.SUCCESS){
            yield put({
                type:GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetAllTaskTypeSaga(){
    return yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskTypeSaga )
}