import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_PROJECT_CATEGORY_SAGA } from '../../redux/types/ProjectType';
import { withFormik } from 'formik';

function CreateProject(props) {

    const { projectCategory } = useSelector(state => state.ProjectCategoryReducer);
    const dispatch = useDispatch()

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_CATEGORY_SAGA
        })
    }, [])

    const renderProjectCategory = () => {
        return projectCategory?.map((item, index) => {
            return <option key={index} value={item.id}>{item.projectCategoryName}</option>
        })
    }


    const {
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    return (
        <form className='container mt-5' onSubmit={handleSubmit}>
            <h1 className='text-center'>Create Project</h1>
            <div>
                <div>
                    <p>Name</p>
                    <input name='projectName' type="text" className='form-control' onChange={handleChange} />
                </div>
                <div className='mt-3'>
                    <p>Description</p>
                    <Editor
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className='mt-3'>
                    <p>Type</p>
                    <select className='form-control' name='categoryId' onChange={handleChange}>
                        {renderProjectCategory()}
                    </select>
                </div>
                <div className='my-3'>
                    <button className='btn btn-outline-primary' type='submit'> Create Project</button>
                </div>
            </div>
        </form>
    )
}



const createProject = withFormik({
    mapPropsToValues: (props) => (
        {
            projectName: '',
            description: '',
            categoryId: props.projectCategory[0]?.id
        }),



    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            model: values
        })
    },

    displayName: 'Create Project',
})(CreateProject);


const mapStateToProps = state => {
    return {
        projectCategory: state.ProjectCategoryReducer.projectCategory
    }
}
export default connect(mapStateToProps)(createProject)