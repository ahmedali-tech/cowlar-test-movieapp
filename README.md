# Cowlar Test
Created by Ahmed Ali Niazi for Cowlar Test
A  full-stack movie watching application where user can signup to watch movies, add their own movies and reviews the movies.


## Setting up the Project Locally

1. Clone the project

```bash
  git clone https://github.com/ahmedali-tech/cowlar-test-movieapp
```

2. Go to the project directory

```bash
  cd cowlar-test-movieapp
```

3. Install the modules for both frontend and backend by going into their directories via terminal using



```bash
 npm install
```



## Use your App

App will be accessible at:

```bash
http://localhost:5173/
```

By the way, Backend is hosted on the port

```bash
http://localhost:5000/
```

# Working of the App:

- You can visit the app as guest user without logging in, this includes watching movies and their reviews.
- But to add movies and reviews, you have to sign up on the signup page.
- After signing in, you will be redirected to the home page where you can view all the available movies sorted on the basic of ratings (top-rated as listed above), add movies, and go to your own added movies.
- By selecting a movie, you can view the details, watch the movie, view and add your review.

## Running Tests

To run tests, you have to go to the terminal of each `frontend` and `backend`, and run the test command there.

### FRONTEND TESTING

```bash
  npm run test
```

### BACKEND TESTING

```bash
  npm run test
```

## Tech Stack

**Frontend:** React, Typescript, Vite, TailwindCSS, Axios, React Testing Library, Jest, React Router Dom, React Hook Form

**Backend:** Node, Express, Typescript, Mongoose, JWT, Brcypt, Jest, SuperTest

**Database:** MongoDB