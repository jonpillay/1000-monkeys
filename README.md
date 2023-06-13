![AI-Tastic Tales](/frontend/public/images/homepageLogo313.png)
------
------
<!-- TABLE OF CONTENTS -->
## **Table of Contents**

1. Project Description
2. Features
3. MVP (Miniman Viable Product)
4. Technologies
5. Prerequisites
6. Installation
7. Running the project
8. Run tests in the:  
    a. Backend  
    b. Frontend  
9. Authors

------
------
<!-- ABOUT THE PROJECT -->
## **1. Project Description**

Introducing "AI-Tastic Tales: Personalised Storytelling & Visual Imagery Generator." This innovative program harnesses the capabilities of the ChatGPT API to craft unique short stories, tailored chapter by chapter to user prompts. Additionally, it seamlessly incorporates the Stable Diffusion API, allowing for the generation of captivating visuals inspired by the story prompts. Users are invited to provide prompts, receive story chapters, and offer feedback to actively shape the narrative. AI-Tastic Tales dynamically generates visuals that complement the evolving story, resulting in a captivating and immersive experience. The final creation can be exported and shared in a variety of formats. Immerse yourself in the power of AI-driven storytelling and behold the beauty of stunning visuals with AI-Tastic Tales.

------
------
## **2. AI-Tastic Tales Features**

- User Prompts: Users provide creative inputs like characters, settings, and themes for their story.
- Chapter Generation: ChatGPT API generates captivating story chapters, incorporating user prompts seamlessly.
- Iterative Storytelling: Users provide feedback and ideas for each chapter, shaping the story according to their preferences and imagination.
- API Integration: Stable Diffusion API creates vivid visual descriptions based on story prompts, enhancing the immersive experience.
- Dynamic Visuals: AI-Tastic Tales generates visuals inspired by user prompts and AI-generated content, evolving with each chapter.
- Export and Sharing: Users can export personalized stories with visuals in various formats and share them with others.

------
------

## **3. MVP | Minimum Viable Product**

Below is an example of our MVP:
![excalidraw plan](/frontend/public/images/mvp_wireframes.png)

------

### GitHub Project Table

[Link to our Github Project Table](https://github.com/orgs/AI-tistic-Tales/projects/1/views/1)

------
------

## **4. MERN stack and other technologies**

- <img src="https://simpleicons.org/icons/express.svg" width="12" height="12">  [Express](https://expressjs.com/)
- <img src="https://simpleicons.org/icons/react.svg" width="12" height="12">  [React](https://react.dev/)
- <img src="https://simpleicons.org/icons/nodedotjs.svg" width="12" height="12">  [Node](https://nodejs.org/en)

Additional technologies:

- <img src="https://simpleicons.org/icons/jest.svg" width="12" height="12">  [Jest](https://jestjs.io/)
- <img src="https://simpleicons.org/icons/cypress.svg" width="12" height="12">  [Cypress](https://www.cypress.io/)
- <img src="https://simpleicons.org/icons/handlebarsdotjs.svg" width="12" height="12">  [Handlebars](https://handlebarsjs.com/)
- <img src="https://simpleicons.org/icons/nodemon.svg" width="12" height="12">  [Nodemon](https://www.npmjs.com/package/nodemon)

------
------

## **5. Prerequisites**

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
------

## **6. Installation**

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
------
<!-- INSTALLATION -->
## **7. Running the project**

Once the repository is cloned and the dependencies have been installed, run the program.

1. To run the backend:

    ```
    cd api
    npm start
    ```
2. Then to run the frontend:

    ```
    cd ../frontend
    npm start
    ```


------
------

<!-- TESTING -->
## **8. Run the tests**

Close the program by inputting `ctrl+c` in both the api and frontend terminal. Then do the following:

- #### *a. The Backend (API)*

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

- #### *b. The Frontend (React)*

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

------
------

## **9. Authors**

### Each valued member of AI-Tastic Tales that contributed to this project:

#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/63741021?v=4" width="30" height="30"> [Jon Pillay](https://github.com/jonpillay)
#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/10515623?v=4" width="30" height="30"> [Natasha Buckham](https://github.com/natashabuckham)
#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/114309741?v=4" width="30" height="30"> [Sidra Iqbal](https://github.com/siqbal181)
#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://ca.slack-edge.com/T03ALA7H4-U04NVL8MM3Q-1efd84dcd610-512" width="30" height="30"> [Chris Toplisek](https://github.com/toppy007)
#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/121251204?v=4" width="30" height="30"> [Umut Baykan](https://github.com/umutbaykan)
#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/124444624?v=4" width="30" height="30"> [Daniel John](https://github.com/djohn06)

### Honarable Mention:

#### &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <img src="https://avatars.githubusercontent.com/u/32678879?v=4" width="30" height="30"> [Sunaina Rishi](https://github.com/SunainaR)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;*For the original idea that eventually sprouted into AI-Tastic Tales!*