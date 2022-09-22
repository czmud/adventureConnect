import Organizer from "./Organizer";
import User from "./User";

class EventModel{
    eventName: string;
    eventDescription: string;
    eventType: string;
    eventDate: Date;
    eventIntensity: number;
    eventOrganizer: Organizer;
    eventUsers: User[]

    constructor(eventName: string, eventDescription: string, eventType: string, eventDate: Date, eventIntensity: number, eventOrganizer: Organizer, eventUsers: User[]){
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventType = eventType;
        this.eventDate = eventDate;
        this.eventIntensity = eventIntensity;
        this.eventOrganizer = eventOrganizer;
        this.eventUsers = eventUsers;
    }
}
export default EventModel