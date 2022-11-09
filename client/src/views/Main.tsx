import * as React from 'react';

import HeaderBar from '../components/HeaderBar';
import Background from '../images/giphy1.gif';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import EventModelForView from '../models/EventModelForView';
import dateDisplay from '../utils/dates/DateDisplay';
import { Link } from 'react-router-dom';

const tableStyle = {
	width: '90%',
	margin: '15% 5% 0',
	border: '2px solid black',
	maxHeight: '500px',
	overflow: 'scroll',
};
const imageStyle = {
	height: '800px',
	margin: '0px',
	width: '100%',
	position: 'absolute' as 'absolute',
	left: '0',
	zIndex: '-1',
};

const Main = () => {
	const [allEvents, setAllEvents] = React.useState<EventModelForView[]>([]);
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_SERVER_URL + '/api/events')
			.then((response) => {
				setAllEvents(response.data.events);
				setLoaded(true);
			})
			.catch((errors) => console.error(errors));
	}, []);

	return (
		<div>
			<HeaderBar title="Upcoming Events" btnTitle="Login" btnRoute="login" />
			<img alt="forrest" style={imageStyle} src={Background}></img>

			{loaded && (
				<TableContainer style={tableStyle} component={Paper}>
					<Table stickyHeader aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: '30%' }}>
									<strong>
										<h1>Event Name</h1>
									</strong>
								</TableCell>
								<TableCell align="right" style={{ width: '20%' }}>
									<strong>
										<h1>Type </h1>
									</strong>
								</TableCell>
								<TableCell align="right" style={{ width: '20%' }}>
									<strong>
										<h1>Intensity</h1>
									</strong>
								</TableCell>
								<TableCell align="right" style={{ width: '30%' }}>
									<strong>
										<h1>Date</h1>
									</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allEvents.map((oneEvent) => (
								<TableRow
									key={oneEvent._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										<Link to={'/event/display/' + oneEvent._id}>
											{oneEvent.name}
										</Link>
									</TableCell>
									<TableCell align="right">{oneEvent.type}</TableCell>
									<TableCell align="right">{oneEvent.intensity}</TableCell>
									<TableCell align="right">
										{dateDisplay(oneEvent.date.toString())}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
};
export default Main;
