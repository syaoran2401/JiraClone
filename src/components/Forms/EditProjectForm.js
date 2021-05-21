import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { GET_PROJECT_CATEGORY_SAGA, UPDATE_PROJECT_SAGA } from '../../redux/types/ProjectType';
import { withFormik } from 'formik';
import { SET_SUBMIT_FORM_EDIT } from '../../redux/types/JiraType';

function EditProjectForm(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_CATEGORY_SAGA
        })
        dispatch({
            type: SET_SUBMIT_FORM_EDIT,
            submitFunction: handleSubmit
        })
    }, [])


    const { projectCategory } = useSelector(state => state.ProjectCategoryReducer);
    const { projectEditDetail } = useSelector(state => state.ProjectDetailReducer);

    const renderProjectCategory = () => {
        return projectCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
    }

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    const {handleChange,handleSubmit,values,setFieldValue} = props;

    return (
        <form className="container-fluid">
            <div className='row' onSubmit={handleSubmit}>
                <div className='col-4'>
                    <div className='form-group'>
                        <h5>Project ID</h5>
                        <input name='projectName' value={values.id} disabled className='mt-2 form-control' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <h5>Project Name</h5>
                        <input name='projectName' value={values.projectName} className='mt-2 form-control' onChange={handleChange} />

                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <h5>Project Category</h5>
                        <select name='categoryId' className='mt-2' value={values.categoryId} onChange={handleChange}>
                            {renderProjectCategory()}
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h5>Description</h5>
                <Editor name="description"
                    initialValue={values.description}
                    value={projectEditDetail.description}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </form>
    )
}


const editProjectFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.projectEditDetail?.id,
            projectName: props.projectEditDetail.projectName,
            description: props.projectEditDetail.description,
            categoryId: props.projectEditDetail.categoryId,
        }
    },


    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            model: values
        })
    },

    displayName: 'Edit Project Form',
})(EditProjectForm);

const mapStateToProps = state => {
    return {
        projectEditDetail: state.ProjectDetailReducer.projectEditDetail
    }
}

export default connect(mapStateToProps)(editProjectFormWithFormik)