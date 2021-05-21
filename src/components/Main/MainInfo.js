import React from 'react'

export default function MainInfo(props) {

    const {projectDetail} = props;
    const memberInProject = () =>{
        return projectDetail.members?.map((mem, index)=>{
            return   <div key={index} className="avatar">
            <img src={mem.avatar} alt={mem.avatar} />
        </div>
        })
    }
    return (

        <div>
            <h3>{projectDetail.projectName}</h3>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group align-items-center justify-content-between" style={{ display: 'flex' }}>
                    <p className="mb-0 mx-3 font-weight-bold">Members: </p>
                    {memberInProject()}
                </div>
            </div>
        </div>

    )
}
