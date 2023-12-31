# About Acebook

Acebook is the first MERN stack project at Makers Academy. We were challenged to work in groups to work with a legacy codebase, **improve and extend** it. This project was completed within a two week period by [Claire Peng](https://github.com/clairep94), [Sam Ford](https://github.com/Fordcois), [Ben Dixon](https://github.com/BenDixon96), [Megan Folsom](https://github.com/mfolsom), and [Tej Chana](https://github.com/Mchana)

- [Project Brief](./project-brief/README.md)
- [Project Documentation](./project-brief/DOCUMENTATION.md)

# Project Features

## Registration & Login



https://github.com/clairep94/acebook-Griffins/assets/128436909/bd56e989-74fe-441d-98ac-067aeeb99a32


- Users can register and log in
- Users can see an error message if their email is already registered with Acebook
- Users can see an error message if the user signs in with the wrong password

## New Post


https://github.com/clairep94/acebook-Griffins/assets/128436909/a18d95f6-6a49-4c87-bcc0-c31cb1ff4149



- Users see their name in the new post text input box
- Users can post both images and text

## Timeline & Posts


https://github.com/clairep94/acebook-Griffins/assets/128436909/97a75f11-4742-4b75-912b-a834da9a83dc



- Users can see a timeline of posts, sorted by Newest first
- Users can see the post author, relative and absolute timestamps, and link to their profiles
- Users can like/unlike posts
- Users can see a list of comments
- Users can add a new comment
  
## Sort by Trending


https://github.com/clairep94/acebook-Griffins/assets/128436909/f6dfd789-a0ba-41cf-95b5-4566dfbf4920



- Users can sort posts by New or sort by Trending
- Users can see 🔥 next to trending posts -- newer posts with more recent engagement (comments, likes) are prioritised


## Searchbar


https://github.com/clairep94/acebook-Griffins/assets/128436909/d795443f-2289-4e03-8f8b-fb5f96098f03



- Users can use live-search searchbar 

## Profile


https://github.com/clairep94/acebook-Griffins/assets/128436909/b38500e9-f0e0-4d7f-8559-caabc3dc091e


- Users can see their profile, profile picture, bio, email, and past posts 
- Users can update their bios

## Friends


https://github.com/clairep94/acebook-Griffins/assets/128436909/40ae6a16-627a-41aa-9d53-e897e294134c



- Users can send/unsend friend requests on other user's profiles
- Users can confirm/deny friend requests in their friend requests page or on other users' pages 
- Users can see a notification in their navbar if they have a friend request
- Users can unfriend friends through their friends list or on other users' pages

## Timeout



https://github.com/clairep94/acebook-Griffins/assets/128436909/ce384f55-9a04-40c8-b7f0-ad4423e0f4b4


- If inactive for 20 minutes, users get timed out and a log-in prompt occurs

# Project Dependencies

### Node.js
1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```
4. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```

### MongoDB
1. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
2. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Cloudinary
1. Sign up for a [Cloudinary](https://cloudinary.com/ip/gr-sea-gg-brand-home-base?utm_source=google&utm_medium=search&utm_campaign=goog_selfserve_brand_wk22_replicate_core_branded_keyword&utm_term=1329&campaignid=17601148700&adgroupid=141182782954&keyword=cloudinary&device=c&matchtype=e&adid=606528222178&adposition=&gad_source=1&gclid=Cj0KCQiAgqGrBhDtARIsAM5s0_nWFgLJjSNJMHqAz1GvOh1nrCvndJM2cAk84-7MrtO3zW7zY96B9nMaAqpREALw_wcB) account.
2. In `/api` install the following:
  ```
  ; cd api 
  ; npm install cloudinary multer dotenv
  ```
3. In `/frontend` install the following:
  ```
  ; cd frontend
  ; npm install --save-dev cypress-file-upload
  ```
4. Add a `.env` file to your root folder and add the following variables (replacing the values with your Cloudinary account API credentials)
  ```
  ; CLOUDINARY_CLOUD_NAME=your_cloud_name
  ; CLOUDINARY_API_KEY=your_api_key
  ; CLOUDINARY_API_SECRET=your_api_secret
  ```

# Running the Server and App
1. Start the server application (in the `api` directory)

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```
2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/`
