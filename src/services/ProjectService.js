import {BaseService} from './BaseService'

export class ProjectService extends BaseService{
    getAllProject = () =>{
        return this.get('Project/getAllProject')
    }

    getProjectCategory = ()=>{
        return this.get('/ProjectCategory')
    }

    getProjectDetail = (id) =>{
        return this.get(`Project/getProjectDetail?id=${id}`)
    }

    updateProject = (id, model) =>{
        return this.put(`Project/updateProject?projectId=${id}`, model)
    }

    createProject = (model) =>{
        return this.post(`Project/createProjectAuthorize`, model)
    }
    
    deleteProject = (id) =>{
        return this.delete(`/Project/deleteProject?projectId=${id}`)
    }
    removeUser = (model) =>{
        return this.post('Project/removeUserFromProject', model)
    }


}

export const projectService = new ProjectService()