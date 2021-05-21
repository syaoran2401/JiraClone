import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd';

export default function LoginTemplate(props) {

    const {  Sider } = Layout;
    const { Component, ...resParam } = props

    const [size, setSize] = useState({
        width:window.innerWidth,
        height:window.innerHeight
    })

    useEffect(() => {
        window.onresize = () =>{
            setSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
       
    })
    return (
        <Route {...resParam} render={(propsRoute) => {
            return <Layout>
                <Sider style={{ height:size.height, backgroundImage: 'url(https://picsum.photos/2000)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} width={size.width / 3} />
                <Layout>
                    <Component {...propsRoute} />
                </Layout>
            </Layout>
        }} />
    )
}
