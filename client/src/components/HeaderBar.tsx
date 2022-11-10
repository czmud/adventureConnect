import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from './buttons/LogoutButton';

const HeaderBar = (props: any) => {
	const { title, btnTitle, btnRoute } = props;

	const nav = useNavigate();

	const headStyle = {
		height: '100px',
		width: '100%',
		borderBottom: '2px solid black',
		margin: '0px',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		background: 'rgba(76, 175, 80, 0.3)',
	};
	const titleStyle = {
		color: 'purple',
		fontSize: '6vw',
	};
	const buttonStyle = {
		height: 'auto',
		width: '8%',
		fontSize: '1.35vw',
	};

	return (
		<div style={headStyle}>
			<h1 style={titleStyle}>AdvCon</h1>
			<h1 style={{ fontSize: '4vw' }}>{title}</h1>
			{btnTitle === 'Logout' ? (
				<LogoutButton />
			) : (
				<button style={buttonStyle} onClick={() => nav('/' + btnRoute)}>
					{btnTitle}
				</button>
			)}
		</div>
	);
};

export default HeaderBar;
