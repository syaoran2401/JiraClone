import React from 'react';
import { Drawer,  Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/types/JiraType';

export default function DrawerJira() {
    
    const { visible, componentContentDrawer, callBackSubmit, title } = useSelector(state => state.ModalJiraReducer);
    const dispatch = useDispatch()
    
    
    const onClose = () => {
        dispatch({
            type:CLOSE_DRAWER,
        })
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right'}} >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {componentContentDrawer}
            </Drawer>
        </>
    )
}
