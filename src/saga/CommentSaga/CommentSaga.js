import { takeLatest, call, put } from "@redux-saga/core/effects";
import { ADD_COMMENT_SAGA, DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../redux/types/Comment";
import { commentService } from "../../services/CommentService";
import { STATUS_CODE } from "../../util/Constants/SettingDOMAIN";


function* getAllComment(action) {
    try {
        const { data } = yield call(() => commentService.getAllComment(action.taskId));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                comment: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}


export function* theoDoiGetAllCommentSaga() {
    return yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComment)
}

//Add comment
function* addComment(action) {
    const { model, taskId } = action;
    try {
        yield call(() => commentService.addComment(model));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiAddCommentSaga() {
    return yield takeLatest(ADD_COMMENT_SAGA, addComment)
}

//Update comment 

export function* updateCommentSaga(action) {
    const { id, contentComment, taskId } = action;
    try {
        yield call(() => commentService.updateComment(id, contentComment));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUpdateCommentSaga() {
    return yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga)
}




// Delete comment 
export function* deleteCommentSaga(action) {
    const { id, taskId } = action;
    try {
        yield call(() => commentService.deleteComment(id));
        if (STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiDeleteCommentSaga() {
    return yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}