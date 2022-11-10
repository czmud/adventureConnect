import React from 'react';
import HeaderBar from '../components/HeaderBar';
import EventDisplay from '../components/EventDisplay';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Organizer from '../models/Organizer';
import EventModelForView from '../models/EventModelForView';

const EventPage = () => {
	const { id } = useParams();
	const [thisEvent, setThisEvent] = React.useState<EventModelForView>(
		new EventModelForView(
			'',
			'',
			'',
			'',
			new Date(),
			1,
			new Organizer('id', 'fName', 'lName', 'email'),
			[],
		),
	);

	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_SERVER_URL + '/api/events/' + id)
			.then((res) =>
				setThisEvent(
					new EventModelForView(
						res.data.event._id,
						res.data.event.name,
						res.data.event.description,
						res.data.event.type,
						res.data.event.date,
						res.data.event.intensity,
						res.data.event.organizer,
						res.data.event.users,
					),
				),
			)
			.catch((errors) => console.error(errors));
	}, [id]);

	const [currentOrganizer, setCurrentOrganizer] = React.useState<Organizer>(new Organizer());

	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_SERVER_URL + '/api/organizers/current')
			.then((response) => {
				console.log(response);
				setCurrentOrganizer(
					new Organizer(
						response.data.organizer._id,
						response.data.organizer.firstName,
						response.data.organizer.lastName,
						response.data.organizer.email,
					),
				);
			})
			.catch((errors) => console.error(errors));
	}, []);

	return (
		<>
			{currentOrganizer.organizerId ? (
				<HeaderBar title={thisEvent.name} btnTitle="Logout" btnRoute="logout" />
			) : (
				<HeaderBar title={thisEvent.name} btnTitle="Login" btnRoute="login" />
			)}
			<EventDisplay current={currentOrganizer} event={thisEvent} />
		</>
	);
};

export default EventPage;
