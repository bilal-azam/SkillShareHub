# SkillShareHub
SkillShareHub is a web application built on the MERN stack (MongoDB, Express, React, Node.js) that connects individuals looking to share their skills with those eager to learn. Whether you're a beginner, intermediate, or advanced in a particular skill, SkillShareHub helps you find the right match to learn from or teach others.

## Features
1. User Authentication: Secure user registration, login, and logout using JWT tokens.
2. User Profiles: Create and manage your personal profile, including your bio and a list of skills you can teach or want to learn.
3. Skill Management: Add, update, or remove skills with associated proficiency levels (Beginner, Intermediate, Advanced).
4. Search and Matching: Find users based on skills they want to share or learn, with an integrated matching algorithm that ranks users based on skill compatibility.
5. Responsive UI: User-friendly interface designed with React, ensuring a seamless experience across devices.

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

## Frontend Overview

### Pages

1. Home: Introduction and explanation of the platform.
2. Register/Login: User authentication pages.
3. Profile: User profile management, including bio and skill management.
4. Search: Search for other users based on skills, view match strength.

### Components

1. Navbar: Navigation bar that includes links to different pages.
2. ProfileForm: Form for managing user profile information.
3. SkillList: List of skills with add and remove functionality.
4. SearchResults: Display of users matching the search query.

## Matching Algorithm
The matching algorithm ranks users based on the relevance of their skills to the search query. Users with skills that closely match the query and have a higher proficiency level are ranked higher.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Create a pull request.

