#  AI-tistic-Tales

<!-- TABLE OF CONTENTS -->
## Table of Contents

------

- Table of Contents
- Project Description
- Features
- MVP
- Technologies
- How to run the project
- Prerequisites
- Installation
  - How to run tests
    - 1. Backend
    - 2. Frontend
  - Database

------

<!-- ABOUT THE PROJECT -->
## Project Description

------

Introducing "AI-tistic Tales: Personalized Storytelling & Visual Imagery Generator." This program utilizes the ChatGPT API to create customized short stories chapter by chapter based on user prompts. It also integrates the Stable Diffusion API to generate visuals inspired by the story prompts. Users provide prompts, receive story chapters, and provide feedback to shape the narrative. AI-tistic Tales dynamically creates visuals that accompany the evolving story. The final creation can be exported and shared in various formats. Experience the power of AI-driven storytelling and stunning visuals with AI-tistic Tales.

## AI-tistic Tales Features

- User Prompts: Users provide creative inputs like characters, settings, and themes for their story.
- Chapter Generation: ChatGPT API generates captivating story chapters, incorporating user prompts seamlessly.
- Iterative Storytelling: Users provide feedback and ideas for each chapter, shaping the story according to their preferences and imagination.
- API Integration: Stable Diffusion API creates vivid visual descriptions based on story prompts, enhancing the immersive experience.
- Dynamic Visuals: AI-tistic Tales generates visuals inspired by user prompts and AI-generated content, evolving with each chapter.
- Export and Sharing: Users can export personalized stories with visuals in various formats and share them with others.

------

## MVP

![excalidraw plan](/frontend/public/images/AI-tistic_Tales-MVP-wireframe.png)

------

## Card Wall

[Github Board link](https://github.com/orgs/AI-tistic-Tales/projects/1/views/1)

------

## MERN STACK AND OTHER TECHNOLOGIES

- [![Express][express-badge]][express-url]
- [![React][react-badge]][react-url]
- [![Node.js][node-badge]][node-url]

additional tools:

- [Jest](https://jestjs.io/) for unit testing on the back end
- [Cypress](https://www.cypress.io/) for end-to-end testing and component testing, on the front end
- [Handlebars](https://handlebarsjs.com/) for the `home` template.
- [Nodemon](https://nodemon.io/) to reload the server automatically.

------

<!-- INSTALLATION -->
## How to run the project

------

## Prerequisites

Before running the project, ensure that you have installed `npm` and `node` in your local machine. If they are not installed, please follow the steps below.

- npm

    ```bash
    npm install npm@latest -g
    npm -v
    ```

- nvm & node

    ```bash
    brew install nvm
    nvm install node
    node -v
    ```

------

## Installation

1. Clone the repo

    ```bash
    git clone https://github.com/AI-tistic-Tales/AI-tistic-Tales.git
    ```

2. Install NPM packages

    ```bash
    cd api
    npm install

    cd ../frontend
    npm install
    ```

------

<!-- TESTING -->
## How to run the tests

------

- #### The Backend (API)

    Start the server in test mode (so that it connects to the test DB)

    ```bash
    cd api
    npm run start:test
    ```

    Then run the tests in a new terminal session

    ```bash
    cd api
    npm run test
    ```

- #### The Frontend (React)

    Start the server in test mode (so that it connects to the test DB)

    ```bash
    cd api
    npm run start:test
    ```

    Then start the front end in a new terminal session

    ```bash
    cd frontend
    npm start
    ```

    Then run the tests in a new terminal session

    ```bash
    cd frontend
    npm run test
    ```

- #### The Frontend (React)

    ```bash
    use aitistic_tales
    db.createCollection("messages")
    db.messages.insertOne({ messages: "hello" })
    ```

    ```bash
    use aitistic_tales_test
    db.createCollection("messages")
    db.messages.insertOne({ messages: "hello" })
    ```

------

