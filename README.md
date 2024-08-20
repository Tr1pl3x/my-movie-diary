# 🎬 my-movie-diary

Greetings!! 🤠 
This web application allows you to view the list of movies I have watched along with the details such as the date watched, rating, release date and my personal remarks. The purpose of the project is to create my own personalised movie diary while I explore and learn about web-development (front-end and backend) and web deployment.

---
### Before we go further ahead, here are some useful links:
- [GitHub repo of backend service for this application](https://github.com/Tr1pl3x/backend-my-movie-diary?tab=readme-ov-file)
- [Active deployed site](https://movies-diary-pyae.online/)

---

## 📚 Table of Contents
1. [Inspiration](#1-inspiration-)
2. [Project Structure](#2-project-structure-)
   - [Key Compoenents](#️-21-key-components)
3. [Features](#3-features-)
   - [For Public Viewer](#-for-public-viewer-)
   - [For Me](#-for-me)
4. [Frontend-Backend Interaction](#4-frontend-backend-interaction-️)
5. [Technologies Used](#5-technologies-used-️)
6. [Development Log](#6-development-log-️)
8. [Contact](#8-contact-)

---

##  1. Inspiration 💡

Date: 21/08/2024
Recently, I have been into watching movies especially the classics ones that people would recommend and to be frank, I have been enjoying watching them. After finishing a movie, I always keep notes of the movie in the Iphone notes app, writing down the date I watch, my thoughts and what I would rate it out of. Then, after awhile, the note thread starts to look bulky and ugly so I decided to do something about it. I could have migrated my notes to notion but I decided to take it up a notch when I was inspired by a youtube tutorial video online about using react to create a to-do-list under an hour time.
With the motivation I gained from the online tutorial, I decided to learn react and create a web app to showcase my movie journey. My whole motivation was to create a web and deploy and be done with it but when I deployed, I found out that the data wasn't preserved as there was no backend service for this so I decided to implement the backend code using the knowledge I gained from one of my uni courses in UNSW:[COMP1531](https://www.handbook.unsw.edu.au/undergraduate/courses/2024/COMP1531?year=2024). Then, I deployed my frontend using [Netlify](https://www.netlify.com/) and for my backend, I used [Mongodb Atlas](https://www.mongodb.com/products/platform/atlas-database) for my cloud database with the web host [Render](https://render.com/).

---

## 2. Project Structure 📑 
The key files for the project is structured as follows:

```bash
├── public
│   ├── index.html           # Main HTML file
├── src
│   ├── components
│   │   ├── AddMovieComponent
│   │   │   ├── AddMovieComponent.js
│   │   │   ├── AddMovieComponent.module.css
│   │   ├── IntroComponent
│   │   │   ├── IntroComponent.js
│   │   │   ├── IntroComponent.module.css
│   │   ├── MovieComponent
│   │   │   ├── MovieComponent.js
│   │   │   ├── MovieComponent.module.css
│   │   ├── SortComponent
│   │   │   ├── SortComponent.js
│   │   │   ├── SortComponent.module.css
│   │   ├── TitleComponent
│   │   │   ├── TitleComponent.js
│   │   │   ├── TitleComponent.module.css
│   ├── App.js                # Main React component
│   ├── App.css               # Global styles
│   ├── index.js              # React entry point


```
#### 🗝️ 2.1: Key Components 
- **AddMovieComponent**: 
   - The form used to add or edit movies.
- **IntroComponent**: 
   - Displays a welcome message to the user.
- **MovieComponent**: 
   - Renders individual movie cards with details and options to edit or remove.
- **SortComponent**: 
   - Dropdown menu to sort the movie list.
- **TitleComponent**: 
   - Displays the main title of the movie diary and includes an add button.

***Note***: Each file contains explainatory comments that are <u>detailed</u>.

---
##  3. Features 🌟
Since the project is a creation for myself and a showcase of my movie journey to the public, there are two targets for the features; first is for the public viewer and second is for me. The difference between the two is the features for me can be only accessed with a known password.

### 🌍 For Public Viewer 🌍 
- **Sort Movies**: Sort your movie list by watched date, release date, alphabetical order, or rating.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.
- **API Integration**: Fetch movie details like posters and release dates directly from The Movie Database (TMDb) API.

### 🦾 For Me 🦾
- **Add Movies**: Add new movies to my diary with details such as title, watched date, rating, and personal remarks.
- **Edit Movies**: Update the details of movies I've already added.
- **Remove Movies**: Delete movies from the diary.

---

## 4. Frontend-Backend Interaction 🖥️

The frontend of this application, built with React, interacts with the backend through a series of RESTful API requests. When the user adds, edits, or removes a movie, the frontend sends HTTP requests (POST, PUT, DELETE) to the backend, which processes the requests and updates the movie database accordingly. The frontend also fetches the list of movies from the backend using a GET request when the application is loaded, ensuring that the displayed data is always up-to-date. All sensitive operations, such as adding or editing movies, are protected by an admin password, which is verified by the backend before any changes are made.

---

###  5. Technologies Used ⚙️

For Development:
- **npm**: Node package manager.
- **Node.js**: JavaScript runtime environment.
- **React** : Frontend library for building user interfaces.
- **CSS Modules**: Scoped styling for React components.
- **TMDb API**: Third-party API for fetching movie details. [Link Here!](https://developer.themoviedb.org/docs/getting-started)

For Web Deployment:

- [Netlify](https://www.netlify.com/): Hosting service for the frontend.
- [Mongodb Atlas](https://www.mongodb.com/products/platform/atlas-database): cloud database for the backend
- [Render](https://render.com/): Hosting service for the backend.
---

## 6. Development Log 🛠️

The follwing is the log for the entirity of the project (both frontend & backend‼️).

- UI Design
   - created a format for the components such as title, movelist, movie card.
   - adjusted theme in css.
   - tailor the visuals to my liking.
- Implemented adding movie functionality.
   - integrated details of a movie.
   - created add function.
   - adjuted the codebase.
- Added an "add" button.
   - created appearance and subtle animation such as hover effect.
   - Adjusted the UI.
- Integrated API using **TMDB** for the addition of a new movie added.
- Added a trash-icon button.
   - created appearance and subtle animation such as hover effect.
   - Adjusted the UI.
- Implemented removing movie functionaltiy.
   - created remove function.
   - link the logic and the trash-icon button.
- Implemented the logic to show the movie that has been watched recently to the top
- Created a new component called Intro
   - Intro component has a brief introductory parapgraph for the web.
- Created a new component called SORT
   - New component allows user to sort the movie list in preferred option.
   - The given options are: Date Watched, Release Date, Alphabetically, and Ratings.
   - Implemented logic for the component.
      - updated the finished sort logic for this.
- Created an edit button.
    created appearance and subtle animation such as hover effect.
   - Adjusted the UI. 
- Implemented the update functionailty.
   - developed the logic to edit details except the movie title.
- Fixed the bug where the web doesn't go back to default sorted list(Date Watched) upon reloading.
- Fixed the bug where adding and editing behaviours were crashing.
- Enabled smooth scrolling to the top when Edit is called from bottom of the list.
- Created a "Close" button for closing add movie box or edit movie box.
   - created appearance and subtle animation such as hover effect.
   - Adjusted the UI.
   - implemented the logic.
- Implemented a simple backend using MongoDB Atlas.
- Setup local connection between backend and frontend for local development.
- Fix the issue where remove and edit logic cannot be requested due to parameter error.
- Finalised the backend.
- Deployed backend and frontend using Render and Netlify.
- Setup custom domain that I have from GODADDY
- Successfully deployed.
- Minor Fixes to visual aspect of the frontend.
- Finalised the READEME.md

---
### 7. Conclusion 👏

This project is very fun and it is practical for a movie enthusiast like me to keep track of all the movies I watch. I haved learnt so much from doing both frontend and backend of this website. Here is the list of things I gained in the process of developing this website:
- Learnt react framework
   - learnt how to code in JSX(Javascript XML).
   - CSS layout 
   - Usage of React Components
   - UseEffects, UseStates, Hooks
- Learnt how to connect front-end and backend.
- Learnt how to systemically design the web by breaking down into steps.
- Leant to deploy the sites
- Learnt the cloud database and the benefits using them.
- Understood how the DNS, Domains, IPs and static sites work.
- Understood how the data is preserved in websites.

And yes, of course there are also knowledge that I had beforehand to do this project and also, I get to refined them in the process:
- Implementation of backend using node.js
- Knowledge of RESTful API requests
- Skills of Javascript, CSS, HTML
- Basic HTML knowledge
- GIT Usage

In conclusion, I had enjoyed the process of creating this web app as it allows me to explore and learn new aspects of web development while refining the knowledge and skill I have already gained.


---

## 8. Contact 💌
- Maintainer: Pyae Sone Oo
- Email: pyaesoneoo54321@gmail.com
- GitHub: [Tr1pl3x](https://github.com/Tr1pl3x)