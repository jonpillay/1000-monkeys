export const AiEngineTitle = "1000m Ai Engine:"
export const AiEngineText = "The 1000 Monkeys Ai Engine is the interface between your imagination and the Ai Compute we employ to generate your stories. Taking your choices and prompts, we form them into a ball and throw them at the different Ai models to see what we get (when we say 'ball' we mean well formed JSON objects, and when we say 'throw at' we mean process through our effective system prompts)."

export const ReactTitle = "Frontend:"
export const ReactText = "We use React for our frontend. Built on top of a create-react-app base it is written in classic JavaScript. It uses extensive Hooks and Contexts for state management, managing API calls, and disseminating information throughout the app. Complex functional components are used to fetch and present data to the user dynamically."

export const MongoTitle = "Database:"
export const MongoText = "Data is stored on a Mongo Cloud Atlas server. A Mongoose layer handles requests from controllers. Static functions in the models handle database access, fetches, and writes/deletes. Allowing for responsive interactions with the frontend."

export const ExpressTitle = "Web Framework:"
export const ExpressText = "Express is used for routing requests towards the relevant controllers. Also powering middleware to protect routes and assets as well as checking that frontend and backend have the relevant system information in sync."

export const NodeTitle = "Runtime Environment:"
export const NodeText = "...and holding it all together, the glue in the system, the Master of Ceremonies, is the Node runtime environment. Facilitating conversation between the frontend and the backend."

export const NotableTitle = "- Notable Mentions"
export const NotableText1 = "- 1000m uses an Amazon S3 bucket to store and serve system information to the API cache. The JSON file is used as a centralised store connecting character/genre/artstyle choices with assets needed for prompt generation and population of the frontend with user choices."
export const NotableText2 = "- The system also uses img.bb for storage of images created for storybooks. This was a decision taken in the initial MVP development to get around base64 encoding and decoding with MongoDB (and any price restrictions). The service can cause lag, especially when browsing and an Amazon S3 solution has been pondered."