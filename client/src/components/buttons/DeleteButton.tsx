import axios from 'axios';
import React from 'react';

interface DeleteButtonProps {
	_id: string;
	entityType: string;
	buttonName: string;
	successCallback: Function;
}

const DeleteButton = (props: DeleteButtonProps) => {
	const { _id, entityType, buttonName, successCallback } = props;

	//! ======== Needs Delete Routes==============
	const deleteEvent = () => {
		axios
			.delete(process.env.REACT_APP_SERVER_URL + '/api/' + entityType + '/delete/' + _id)
			.then(() => successCallback())
			.catch((errors) => console.error(errors));
	};

	return (
		<button type="button" onClick={deleteEvent}>
			{buttonName}
		</button>
	);
};

export default DeleteButton;
