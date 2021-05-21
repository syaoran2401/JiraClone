import {BaseService} from './BaseService'


export class TaskService extends BaseService{
    getAllTaskType = () =>{
        return this.get(`TaskType/getAll`);
    }

    getAllTaskStatus = ()=>{
        return this.get(`Status/getAll`)
    }

    createTask = (model) =>{
        return this.post(`/Project/createTask`,model )
    }

    updateStatusId = (model) =>{
        return this.put(`/Project/updateStatus`, model)
    };

    getTaskListDetail = (taskId)=>{
        return this.get(`/Project/getTaskDetail?taskId=${taskId}`)
    }

    updateTaskList = (model) =>{
        return this.post('/Project/updateTask', model)
    }
}


export const taskService = new TaskService()