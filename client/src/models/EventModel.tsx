import Organizer from "./Organizer";
import User from "./User";

class EventModel{
    name: string;
    description: string;
    type: string;
    date: Date;
    intensity: number;
    organizer: Organizer;
    users: User[]

    constructor(name: string, description: string, type: string, date: Date, intensity: number, organizer: Organizer, users: User[]){
        this.name = name;
        this.description = description;
        this.type = type;
        this.date = date;
        this.intensity = intensity;
        this.organizer = organizer;
        this.users = users;
    }
}
export default EventModel