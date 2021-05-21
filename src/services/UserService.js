import { BaseService } from "./BaseService";

export class UserService extends BaseService{
    
    userLogin = (model) =>{
        return this.post('/Users/signin', model)
    }

    userSignUp = (model) =>{
        return this.post(`Users/signup`, model)
    }
    
    getAllUser = () =>{
        return this.get('/Users/getUser')
    }

    assignUser = (model) =>{
        return this.post('Project/assignUserProject',model)
    }

    searchUser = (keyword) =>{
        return this.get(`/Users/getUser?keyword=${keyword}`)
    }

    getUserByProjectId = (id) =>{
        return this.get(`Users/getUserByProjectId?idProject=${id}`)
    }
 
}

export const userService = new UserService()