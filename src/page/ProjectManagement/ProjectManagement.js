import React, { useEffect, useRef, useState } from 'react'
import { Popover, Space, Table, Tag } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA, EDIT_PROJECT, DELETE_PROJECT_SAGA } from '../../redux/types/ProjectType';
import Avatar from 'antd/lib/avatar/avatar';
import { ASSIGN_USER_PROJECT_SAGA, GET_USER_SEARCH_SAGA, REMOVE_USER_PROJECT_SAGA } from '../../redux/types/UserType';
import { AutoComplete } from 'antd';
import { OPEN_FORM } from '../../redux/types/JiraType';
import EditProjectForm from '../../components/Forms/EditProjectForm';
import { Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

export default function ProjectManagement(props) {

    const { projectList } = useSelector(state => state.ProjectReducer);
    const { userSearch } = useSelector(state => state.UserReducer);
    const searchRef = useRef(null)
    const [value, setValue] = useState('')
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })

    }, [])


    function confirm(id) {
        dispatch({
            type: DELETE_PROJECT_SAGA,
            projectId: id
        })
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => <p key={index}>
                {record.id}
            </p>
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item1, item2) => {

                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1
                }
                return 1
            },
            render: (text, record, index) => {
                return <NavLink to={`projectDetail/${record.id}`}>{text}</NavLink>
            }
        },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item1, item2) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1
                }
                return 1
            },
            sortDirections: ['descend'],
            render: (text, record, index) => <p key={index}>
                {record.categoryName}
            </p>
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            sorter: (item1, item2) => {
                let creator1 = item1.creator.name?.trim().toLowerCase();
                let creator2 = item2.creator.name?.trim().toLowerCase();
                if (creator1 > creator2) {
                    return -1
                }
                return 1
            },
            sortDirections: ['descend'],
            render: (text, record, index) => <Tag color={'green'} key={index}>
                {record.creator.name}
            </Tag>
        },
        {
            title: 'member',
            dataIndex: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((mem, index) => {
                        return <Popover
                            key={index}
                            placement="top"
                            title="Member"
                            trigger="click"
                            content={() => {
                                return <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((member, index) => {
                                            return <tr key={index}>
                                                <td>{member.userId}</td>
                                                <td><img style={{ borderRadius: '50%', width: '30px', height: '30px' }} src={member.avatar} alt={member.avatar} /></td>
                                                <td>{member.name}</td>
                                                <td><button className='btn btn-danger' style={{ borderRadius: '50%' }} onClick={() => {
                                                    dispatch({
                                                        type: REMOVE_USER_PROJECT_SAGA,
                                                        model: {
                                                            projectId: record.id,
                                                            userId: member.userId
                                                        },

                                                    })
                                                }}>X</button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}
                        >
                            <Avatar key={index} src={mem.avatar} />
                        </Popover>
                    })}
                    {record.members.length > 3 ? <Avatar>...</Avatar> : ''}

                    {<Popover
                        title="Add User"
                        placement="topLeft"
                        trigger="click"
                        content={() => {
                            return <AutoComplete
                                options={userSearch?.map((member, index) => {
                                    return { label: member.name, value: member.userId.toString() }
                                })}
                                value={value} // value from state
                                onChange={(text) => {
                                    setValue(text)
                                }}
                                style={{ width: 200 }}

                                onSearch={(value) => {
                                    if (searchRef.current) {
                                        clearTimeout(searchRef.current)
                                    }
                                    searchRef.current = setTimeout(() => {
                                        dispatch({
                                            type: GET_USER_SEARCH_SAGA,
                                            keyWord: value
                                        })
                                    }, 300)
                                }}

                                onSelect={(value, option) => {
                                    setValue(option.label);
                                    dispatch({
                                        type: ASSIGN_USER_PROJECT_SAGA,
                                        model: {
                                            projectId: record.id,
                                            userId: option.value
                                        }
                                    })
                                }}
                                placeholder="input here"
                            />

                        }}
                    >
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>}
                </div>
            }
        },

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => <Space size="middle">
                <Button type='primary' onClick={() => {
                    dispatch({
                        type: OPEN_FORM,
                        title: 'EDIT PROJECT',
                        componentContentDrawer: <EditProjectForm />
                    })
                    dispatch({
                        type: EDIT_PROJECT,
                        projectEditDetail: record
                    })
                }}><EditOutlined /></Button>

                <Popconfirm
                    title="Are you sure to delete this project?"
                    onConfirm={() => confirm(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='danger'><DeleteOutlined /></Button>
                </Popconfirm>,
            </Space>
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <div className='container-fluid mt-4'>
            <h3 className='text-center'>Project Management</h3>
            <Table columns={columns} rowKey={'id'} dataSource={projectList} onChange={onChange} />
        </div>
    )
}
