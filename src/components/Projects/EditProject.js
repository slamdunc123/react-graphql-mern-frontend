import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import { UPDATE_PROJECT } from '../../api/graphQL/mutations/projectMutations';
import { GET_PROJECTS } from '../../api/graphQL/queries/projectQueries';

const EditProject = ({project, setIsEditing}) => {
    const [formData, setFormData] = useState({
        id: project.id,
		name: project.name,
		description: project.description,
	});

    const {id, name, description} = formData

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id, name, description},
        refetchQueries: [{query: GET_PROJECTS}]
    })

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        if (name === '' || description === '')
			alert('Please complete all fields.');

            updateProject(formData.id, formData.name, formData.description)
            setIsEditing(false)
    }
  return (<>
  <h5>Edit Project</h5>
  {console.log(project)}
    <form onSubmit={handleOnSubmit}>
			<div className='mb-3'>
				<label htmlFor='exampleInputName1' className='form-label'>
					Name
				</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					className='form-control'
					id='exampleInputName1'
					aria-describedby='nameHelp'
					placeholder='Name'
					onChange={handleOnChange}
				/>
			</div>
			<div className='mb-3'>
				<label
					htmlFor='exampleInputDescription1'
					className='form-label'
				>
					Description
				</label>
				<input
					type='text'
					name='description'
					value={formData.description}
					className='form-control'
					id='exampleInputDescription1'
					placeholder='Description'
					onChange={handleOnChange}
				/>
			</div>

			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
  </>
  )
}

export default EditProject