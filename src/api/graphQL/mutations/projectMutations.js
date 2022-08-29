import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
	mutation AddProject($name: String!, $description: String!) {
		addProject(name: $name, description: $description) {
			id
			name
			description
		}
	}
`;
const DELETE_PROJECT = gql`
	mutation DeleteProject($id: ID!) {
		deleteProject(id: $id) {
			id
			name
		}
	}
`;

const UPDATE_PROJECT = gql`
	mutation UpdateProject($id: ID!, $name: String!, $description: String!) {
		updateProject(id: $id, name: $name, description: $description) {
			id
			name
			description
		}
	}
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
