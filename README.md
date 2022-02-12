## Workout Tracker

A Javascript web app to track workouts.

- front end: react typescript
- back end: node express

- Users can log in, create accounts and log out.
- Sets the jwt token as the cookie on successful login, token is used to query the current user which is then saved to a user context. cookie token also used as authorization in later requests

- db and api endpoints set up for Users, Exercises, Muscle Groups.

### TODO

- setup api endpoints and db table for workouts
- Workouts should have the following structure
  - id
  - exercise
  - reps
  - weight
  - date
  - workout_id
  - user_id
- Workouts should have the same CRUD endpoints as Exercises or Muscle Groups

- Front end hasnt been started yet.

### Running Locally

- `npm run dev` in the root folder will boot up both the server and client.
- The server will automatically create a database if one doesnt exist, you will need to update the config to match local env
