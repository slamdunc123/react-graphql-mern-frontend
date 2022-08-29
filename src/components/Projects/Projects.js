import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../api/graphQL/queries/projectQueries';
import AddProject from './AddProject';
import { DELETE_PROJECT } from '../../api/graphQL/mutations/projectMutations';
import EditProject from './EditProject';

const Projects = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentProject, setCurrentProject] = useState(null);
	const { data, loading, error } = useQuery(GET_PROJECTS);
	const [deleteProject] = useMutation(DELETE_PROJECT);

	const handleDeleteOnClick = (id) => {
		deleteProject({
			variables: {
				id: id,
			},
			refetchQueries: [{ query: GET_PROJECTS }],
		});
        setIsEditing(false);
	};
	const handleEditOnClick = (item) => {
		console.log(item);
		setCurrentProject(item);
		setIsEditing(true);
	};


	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<h3>Projects</h3>
			{!isEditing ? (
				<AddProject />
			) : (
				<EditProject project={currentProject}  setIsEditing={setIsEditing}/>
			)}
			{console.log(data.projects)}
			{console.log(currentProject)}
			{data.projects.length > 0
				? data.projects.map((item) => (
						<div
							key={item.id}
							className='d-flex align-items-start justify-content-space-between'
						>
							<p className='col-10'>
								{item.name} - {item.description}
							</p>
							<button
								type='button'
								className='btn btn-warning btn-sm col-2'
								onClick={() => handleEditOnClick(item)}
							>
								Edit
							</button>
							<button
								type='button'
								className='btn btn-danger btn-sm col-2'
								onClick={() => handleDeleteOnClick(item.id)}
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
