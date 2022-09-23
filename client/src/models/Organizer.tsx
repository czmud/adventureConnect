class Organizer{
    organizerId: string;
    firstName: string;
    lastName: string;
    email: string;
    constructor(organizerId: string = "", firstName: string = "", lastName: string = "", email: string = ""){
    this.organizerId = organizerId;
    this.firstName= firstName;
    this.lastName= lastName;
    this.email= email;
    }
}

export default Organizer;
