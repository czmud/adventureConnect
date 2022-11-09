import Organizer from './Organizer';
import User from './User';

class EventModelForView {
	_id: string;
	name: string;
	description: string;
	type: string;
	date: Date;
	intensity: number;
	organizer: Organizer;
	users: User[];

	constructor(
		_id: string,
		name: string,
		description: string,
		type: string,
		date: Date,
		intensity: number,
		organizer: Organizer,
		users: User[],
	) {
		this._id = _id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.date = date;
		this.intensity = intensity;
		this.organizer = organizer;
		this.users = users;
	}
}
export default EventModelForView;
