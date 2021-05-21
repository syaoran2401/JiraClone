import React, {useEffect} from 'react';
import MainContent from '../components/Main/MainContent';
import MainHeader from '../components/Main/MainHeader';
import MainInfo from '../components/Main/MainInfo';
import { useDispatch, useSelector } from 'react-redux';
import {GET_PROJECT_DETAIL_SAGA} from '../redux/types/ProjectType'



export default function IndexJiraClone(props) {

    const dispatch = useDispatch()
    const { projectDetail } = useSelector(state => state.ProjectDetailReducer);
    
    useEffect(() => {
        const {projectId} = props.match.params;
        dispatch({
            type:GET_PROJECT_DETAIL_SAGA,
            id: projectId
        })
    }, [])


    return (
        <div className='main'>
            <MainHeader projectDetail={projectDetail}/>
            <MainInfo projectDetail={projectDetail}/>
            <MainContent projectDetail={projectDetail}/>
        </div>
    )
}
