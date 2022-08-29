import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../api/graphQL/mutations/projectMutations';
import { GET_PROJECTS } from '../../api/graphQL/queries/projectQueries';

const AddProject = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});

	const { name, description } = formData;

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description },
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (name === '' || description === '')
			alert('Please complete all fields.');

		addProject(formData.name, formData.description);
        setFormData({
            name: '',
            description: ''
        })
	};
	return (<>
    <h5>Add Project</h5>
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
	);
};

export default AddProject;
