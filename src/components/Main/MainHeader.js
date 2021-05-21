import React from 'react'

export default function MainHeader(props) {
  const { projectDetail } = props;
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ background: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item active" aria-current="page">
            ProjectId-{projectDetail.id}
          </li>
        </ol>
      </nav>
    </div>

  )
}
