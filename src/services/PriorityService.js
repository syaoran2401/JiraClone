import {BaseService} from './BaseService'

export class PriorityService extends BaseService {
    getAllPriority = () =>{
        return this.get(`/Priority/getAll`)
    }
}

export const priorityService = new PriorityService()