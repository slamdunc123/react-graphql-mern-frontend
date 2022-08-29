import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../api/graphQL/queries/projectQueries';
import AddProject from './AddProject';
import { DELETE_PROJECT } from '../../api/graphQL/mutations/projectMutations';

const Projects = () => {
	const { data, loading, error } = useQuery(GET_PROJECTS);
    const [deleteProject] = useMutation(DELETE_PROJECT)

	const handleOnClick = (id) => {
		deleteProject({
			variables: {
				id: id,
			},
            refetchQueries: [{ query: GET_PROJECTS }],
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<h3>Projects</h3>
			<AddProject />
			{console.log(data.projects)}
			{data.projects.length > 0
				? data.projects.map((item) => (
						<div  key={item.id} className='d-flex align-items-start justify-content-space-between'>
							<p className='col-10'>
								{item.name} - {item.description}
							</p>
							<button
								type='button'
								className='btn btn-danger btn-sm col-2'
								onClick={() => handleOnClick(item.id)}
							>
								Delete
							</button>
						</div>
				  ))
				: 'No Projects'}
		</>
	);
};

export default Projects;
