# SkillShareHub
SkillShareHub is a web application built on the MERN stack (MongoDB, Express, React, Node.js) that connects individuals looking to share their skills with those eager to learn. Whether you're a beginner, intermediate, or advanced in a particular skill, SkillShareHub helps you find the right match to learn from or teach others.

## Features
1. User Authentication: Secure user registration, login, and logout using JWT tokens.
2. User Profiles: Create and manage your personal profile, including your bio and a list of skills you can teach or want to learn.
3. Skill Management: Add, update, or remove skills with associated proficiency levels (Beginner, Intermediate, Advanced).
4. Search and Matching: Find users based on skills they want to share or learn, with an integrated matching algorithm that ranks users based on skill compatibility.
5. User Rating System: Submit and view ratings on user profiles, helping to establish credibility and trust within the community.
6. Responsive UI: User-friendly interface designed with React, ensuring a seamless experience across devices.
7. Skill Exchange System: Request and schedule skill-sharing sessions with other users, complete with a status management system.
8. Notification System: Receive dynamic notifications for new skill exchange requests, updates, and other important events.

### User Rating System
SkillShareHub allows users to rate each other based on their learning or teaching experiences. Ratings include a value between 1 and 5 stars, along with an optional comment. Users can view all ratings they have received on their profile page.

- **Submit Rating:** Navigate to a user's profile page to submit a rating.
- **View Ratings:** All ratings for a user are displayed on their profile page, along with the rating value and any comments.

## Installation
To get started with SkillShareHub, follow these steps:

1. Clone the Repository:
`git clone https://github.com/your-username/SkillShareHub.git
cd SkillShareHub`

2. Install Server Dependencies:
`cd server
npm install`

3. Install Client Dependencies:
`cd ../client
npm install`

4. Set Up Environment Variables:
Create a .env file in the server directory with the following variables:
`MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000`

5. Run the Application:
1. Start the server
`cd ../server
npm start`
2. Start the client:
`cd ../client
npm start`

## API Endpoints

### Authentication
POST /api/users/register - Register a new user.
POST /api/users/login - Login a user and return a JWT token.

### User Profile
GET /api/users/profile - Get the logged-in user's profile.
PUT /api/users/profile - Update the logged-in user's profile.

### Skill Management
POST /api/users/skills - Add a new skill to the user's profile.
DELETE /api/users/skills/:skillId - Remove a skill from the user's profile.

### Search and Matching
GET /api/users/search?skill=<skill> - Search for users by skill.

### Skill Exchange System
POST /api/skill-exchange - Create a new skill exchange request.
PUT /api/skill-exchange/:id - Update a skill exchange request status or scheduled date.
GET /api/skill-exchange - Get all skill exchange requests for the logged-in user.

### Notification System
GET /api/notifications - Get all notifications for the logged-in user.
PUT /api/notifications/:id/read - Mark a notification as read.

### Rating System
POST /api/ratings/:userId - Submit a rating for a user.
GET /api/ratings/:userId - Retrieve all ratings for a user.

## Frontend Overview

### Pages

1. Home: Introduction and explanation of the platform.
2. Register/Login: User authentication pages.
3. Profile: User profile management, including bio and skill management.
4. Search: Search for other users based on skills, view match strength.
5. Skill Exchange: Request, manage, and track skill exchange sessions with other users.
6. Notifications: View and manage notifications related to skill exchanges and other events.
7. User Profile with Ratings: View another user's profile, including their skills and ratings, and submit a new rating.

### Components

1. Navbar: Navigation bar that includes links to different pages.
2. ProfileForm: Form for managing user profile information.
3. SkillList: List of skills with add and remove functionality.
4. SearchResults: Display of users matching the search query.
5. SkillExchangeForm: Form for creating and managing skill exchange requests.
6. Notifications: Display and manage user notifications.
7. RatingForm: Form for submitting a new rating for a user.
8. RatingItem: Display individual rating items on a user's profile.
9. RatingList: A list component to display all ratings for a user, encapsulating multiple RatingItem components.

## Error Handling

### Server-Side
All server routes are wrapped with `try-catch` blocks to handle any potential errors. If an unhandled exception occurs, it is caught by the global error handler, which logs the error and sends a generic error message to the client.

### Client-Side
On the client side, all API calls are wrapped in `try-catch` blocks to capture and handle errors. The application uses `react-toastify` to provide users with feedback, displaying success messages when operations are completed successfully and error messages when they fail.

## Matching Algorithm
The matching algorithm ranks users based on the relevance of their skills to the search query. Users with skills that closely match the query and have a higher proficiency level are ranked higher.

## Deployment

To deploy SkillShareHub to a production environment, follow these steps:

1. Ensure all environment variables are set in a `.env` file in the `server` directory:
   ```env
   `MONGO_URI=<your-production-mongodb-uri>
   JWT_SECRET=<your-production-jwt-secret>
   NODE_ENV=production
   PORT=5000`
2. Create a production build of the client:
    `cd client
    npm run build`
3. Start the server:
    `cd ../server
    npm start`
4. Optionally, deploy the application using a platform like Heroku, Vercel, or AWS.
5. Test Production Build Locally:
    `npx serve -s build`

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Create a pull request.

## API Documentation

### GET /api/users/search
- **Description:** Search users by skill.
- **Query Parameters:**
  - `skill` (string): The skill to search for.
  - `page` (integer): The page number for pagination (default: 1).
  - `limit` (integer): The number of results per page (default: 10).
- **Response:**
  ```json
  {
    "users": [...],
    "totalPages": 5,
    "currentPage": 1
  }

  ## Developer Guide

### Project Structure
- **/client**: React frontend application.
- **/server**: Node.js backend application.

### Getting Started
- Clone the repository.
- Run `npm install` in both `client` and `server` directories.
- Create a `.env` file in the `server` directory with the necessary environment variables.

### Running the Application
- To start the backend: `npm run server`.
- To start the frontend: `npm start` in the `client` directory.

### Deployment
- Ensure all environment variables are set in the production environment.
- Use a service like Heroku, AWS, or DigitalOcean for deployment.