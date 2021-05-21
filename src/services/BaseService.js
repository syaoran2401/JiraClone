import Axios from 'axios'
import { USER_TOKEN } from '../redux/types/UserType'
import { DOMAIN } from '../util/Constants/SettingDOMAIN'



export class BaseService{
    post = (url, model) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'POST',
            data:model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(USER_TOKEN)}
        })
    }

    get = (url) =>{
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(USER_TOKEN)}
        })
    }

    put = (url, model) =>{
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'PUT',
            data:model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(USER_TOKEN)}
        })
    }

    delete = (url) =>{
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(USER_TOKEN)}
        })
    }
}