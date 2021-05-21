import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { UnorderedListOutlined,PlusOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { OPEN_FORM } from '../../redux/types/JiraType';
import CreateTaskForm from '../Forms/CreateTaskForm';


const { Sider } = Layout;


export default function SideBarJira() {

  const [state, setState] = useState({
    collapsed: false
  });

  const [size, setSize] = useState({
    height: window.innerHeight
  })

  const dispatch = useDispatch()

  useEffect(() => {
    window.onresize = () =>{
      setSize({
        height: window.innerHeight
      })
    }
  }, [])

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };


  return (
    <div >


      <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: size.height }}>
        <div className='text-right text-white mb-3' style={{ fontSize: '30px' }} onClick={toggle}><UnorderedListOutlined /></div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"  icon={<PlusOutlined style={{fontSize:'20px'}} /> } onClick={()=>{
            dispatch({
              type:OPEN_FORM,
              componentContentDrawer:<CreateTaskForm/>,
              visible: true,
              title: 'Create Task'
            })
          }}>
            Create Task
        </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );

}
