# MoviesDB application

## Description
This project is a React application that consumes the [MovieDB API](https://developers.themoviedb.org/3) to display a list of movies. 
It consists in two pages:
1. A main page with a list of movies, options to sort and an input where you can type a movie to search for;
2. A detail page that displays the movie selected info such as title, summary, poster image, release date, director, language, cast, run time, rating, similar movies, etc..
3. A statistics page with a simple bar chart showing the top 10 rated movies


## How to run the project

You need [Node.js](https://nodejs.org/en/) to run this application. You can download Node clicking [here](https://nodejs.org/en/download/). After Node installed, you can:

1. Install all dependencies by running:

        npm install

2. Start the application by running:

        npm start


## The chosen tech stack
- Node (14.18.0) and NPM (6.14.15)
- React (17.0.2)
- Typescript (4.5.5)
- SASS (1.49.7)
- React router dom (6.2.1)


## Decisions
- Related to the framework, I choose to use React with Typescript. Typescript is a superset of Javascript that, in my opinion, keeps the code more reliable and easy to refactor due especially to type safety.

- For styling I choose to use SCSS, a CSS extension that enable us to use variables, nested rules and etc. In my opinion, it helps to keep things organized. I also use CSS modules to avoid unintended side effects since the classes are dynamically generated and mapped to the correct styles, fixing the problem of global scope in CSS.  

- Since the MoviesDB is paginated, I added a pagination component.