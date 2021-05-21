import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_PRIORITY, GET_PRIORITY_SAGA } from '../../redux/types/PriorityType'
import { priorityService } from '../../services/PriorityService'
import { STATUS_CODE } from '../../util/Constants/SettingDOMAIN';

function * getAllPrioritySaga(){
    try{
        const {data} = yield call(() => priorityService.getAllPriority());
        if(STATUS_CODE.SUCCESS){
            yield put({
                type:GET_PRIORITY,
                arrPriority: data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetAllPrioritySaga(){
    return yield takeLatest(GET_PRIORITY_SAGA, getAllPrioritySaga)
}