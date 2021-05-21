import React from 'react'
import { Route } from 'react-router-dom'
import MenuJira from '../components/ModalJira/MenuJira'
import ModalTaskDetail from '../components/ModalJira/ModalTaskDetail'
import SideBarJira from '../components/ModalJira/SideBarJira'
import '../index.css'

export default function JiraTemplate(props) {

    const { Component, ...resParam } = props

    return (
        <Route {...resParam} render={(propsRoute) => {
            return <>
            <div className='jira'>
                <SideBarJira />
                <MenuJira />
                <Component {...propsRoute} />
            </div>
            <ModalTaskDetail/>
            </>
        }} />
    )
}
