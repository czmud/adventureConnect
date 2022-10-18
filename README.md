<h1 align="center"> Adventure Connect </h1>

### Features:

- TypeScript utilized for application construction
- React.ts front-end with Materials-UI integration for front-end design
- Express.ts server for back-end API routing and MongoDB access
- Back-end validation and bcrypt password hashing for User data security
- Mongoose integration for storage of User data
- Authentication and authorization via JSON Web Token stored in Users' browser cookies


### Summary:

Adventure Connect is an application for users within the Pacific NorthWest to create, arrange, and join Outdoor Activities.

- Guest Users:
  - Can view all events created within the PNW
  - Can contact the organizer responsible via the provided email link to ask for participation in an event

- Registered Organizers
  - Users that register gain access to Organizer authorization
  - Organizers are allowed to create any type of event supported, with the ability to edit and delete
  - Organizers can add any guests already planning to attend at event creation
  - Organizers are responsible for managing event requests from other Users wishing to participate

### Deployment
- Client - [adventure-connect.vercel.app](https://adventure-connect.vercel.app)
  - Deployed through Vercel for CI/CD pipeline to auto-deploy upon changes to Main
- Server - [adventure-connect-server.vercel.app](https://adventure-connect-server.vercel.app/api/events)
  - Deployed as separate restful API (also through Vercel CI/CD)
  - CORS configured to allow access from Vercel Client URL
- Database
  - Deployed through MongoDB Atlas on M0 Cluster


### Photos:

- Guest User Main Page
<img alt="" src="/projectImages/advCon_guestDisplay.png" style="width:90%;">
<br/>

- Guest User Event Display
<img alt="" src="/projectImages/advCon_guestEvent.png" style="width:90%;">
<br/>

- Organizer Registration
<img alt="" src="/projectImages/advCon_register.png" style="width:90%;">
<br/>

- Organizer Main Page
<img alt="" src="/projectImages/advCon_registeredMain.png" style="width:90%;">
<br/>

- Event Creation Page
<img alt="" src="/projectImages/advCon_createEvent.png" style="width:90%;">
<br/>

- Organizer's Event Display
<img alt="" src="/projectImages/advCon_displayEvent.png" style="width:90%;">


### How to Run Application locally:

- Coming Soon
