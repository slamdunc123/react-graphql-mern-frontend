import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../api/graphQL/queries/projectQueries';

const Projects = () => {
	const { data, loading, error } = useQuery(GET_PROJECTS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<h3>Projects</h3>
			{console.log(data.projects)}
			{data.projects.length > 0
				? data.projects.map((item) => <p>{item.name}</p>)
				: 'No Projects'}
		</>
	);
};

export default Projects;
