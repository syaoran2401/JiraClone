import {BaseService} from './BaseService'

export class CommentService extends BaseService{

    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }

    addComment = (model) =>{
        return this.post('Comment/insertComment', model)
    }

    updateComment = (id, contentComment) =>{
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`)
    }

    deleteComment = (id) =>{
        return this.delete(`Comment/deleteComment?idComment=${id}`)
    }
}


export const commentService = new CommentService()