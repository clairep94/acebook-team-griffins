import React, { useEffect, useState } from 'react';
import './Post.css';
import getSessionUserID from '../utility/getSessionUserID';

const Post = ({post}) => {
  
// =========== STATE VARIABLES ==========================
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  let sessionUserID = getSessionUserID(token);
  // checks if sessionUserID is in user._id for user in post.likes --> array of Users, not user_id's due to populate in controllers/posts line 7-8
  const [userLiked, setUserLiked] = useState(post.likes.some(user => user._id === sessionUserID));


// ============ LIKE BUTTON =============================
  const handleLikeSubmit = async (event) => {

    if(token){
      event.preventDefault();

      // Step 1: Put request for the session user to Like/Unlike the post
      fetch(`/posts/${post._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      }) // complete Put request & update token
      .then(async response => {
        let putData = await response.json();
        console.log("token", putData)
        window.localStorage.setItem("token", putData.token);
        setToken(window.localStorage.getItem("token"));
        
        // Step 2: Perform the GET request to fetch the updated post
        return fetch(`/posts/${post._id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }) // Update post.likes to the data from the new GET request
        .then(getResponse => {
          if (!getResponse.ok) {
            throw new Error(`Failed to fetch updated post with ID ${post._id}`);
          }
          return getResponse.json();
        })
        .then(getData => {
          // Update the likes and userLiked state using the updated post data
          post.likes = getData.post.likes;
          setUserLiked(post.likes.some(user => user._id === sessionUserID));
        })
    }
  }

// ============= DISPLAYING LIKES ==================

  // --------- "X like(s)" ---------------
  const formatNumLikes = (arr) => {
    const numLikes = arr.length;

    if (numLikes === 1){
      return "1 like"
    } else {
      return `${numLikes} likes`
    }}

  const likes_formatted = formatNumLikes(post.likes)

  // --------- "You/User and X others liked this" ---------------
  const formatLikesUsersPreview = (arr) => {
    const numLikes = arr.length;
    // 0 likes
    if (numLikes === 0){
      return "Noone liked this"
    // 1 like
    } else if (numLikes === 1){ //Check if sessionUserID liked this
      return (arr.some(user => user._id === sessionUserID) ? 'You liked this' : `${arr[0].email} liked this`);
    // 2 likes
    } else if (numLikes === 2){
      return (arr.some(user => user._id === sessionUserID) ? 'You and 1 other liked this' : `${arr[0].email} and 1 other liked this`);
    // 3 or more likes
    } else {
      return (arr.some(user => user._id === sessionUserID) ? `You and ${numLikes - 1} others liked this` : `${arr[0].email} and ${numLikes - 1} others liked this`);
    }
  };

  const likes_formatted_with_user_preview = formatLikesUsersPreview(post.likes)


// ======== FORMATTING TIME ==============
// TODO refactor this into a module to reuse for comments/other content

  const postedDateTime = new Date(post.date_posted);
  const currentDateTime = new Date();
 
  // ------------ '19 Nov 2023, 5:45PM' -------------
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const fullDateTimeString = postedDateTime.toLocaleString('en-GB', options);

  // ------------ 'X m ago / X h ago / 1 d ago / fullDateTime --------------

  const convertRelativeDateTimeString = (dateObject) => {
    // get time difference in seconds
    const timeDifferenceInSeconds = (currentDateTime.getTime() - postedDateTime.getTime()) / 1000;
    const seconds = timeDifferenceInSeconds; // shorter variable name for relative timestamp use below

    // show the relative timestamp
    if (seconds < 60) { 
      // if under 1 min, show seconds ago
      return `${Math.floor(seconds)} seconds ago`

    } else if (seconds < 3600) {
      // if under 60 min, show minutes ago
      return ((Math.floor(seconds/60) === 1) ? '1 minute ago' : `${Math.floor(seconds / 60)} minutes ago`);

    } else if (seconds < 86400) {
      // if under 24 hours, show hours ago
      return ((Math.floor(seconds/3600) === 1) ? '1 hour ago' : `${Math.floor(seconds / 3600)} hours ago`);

    } else if (seconds < 259200) {
      // if less than 3 days ago, show days ago
      return ((Math.floor(seconds/86400) === 1) ? '1 day ago' : `${Math.floor(seconds / 86400)} days ago`);

    } else {
      // else show fullDateTimeString
      return fullDateTimeString;
    }
  }

  const relativeDateTimeString = convertRelativeDateTimeString(postedDateTime);


// ========= JSX FOR THE UI OF THE COMPONENT =====================
    return(
    <article className='post-container' data-cy="post" key={ post._id }>
      {/* change below to display name later */}
      <a href={`/user/${post.user_id._id}`}>
      <h3 className='user-display-name'>{ post.user_id.email }</h3> </a>
      {/* choose one format later */}
      <p className='date-posted'>{ fullDateTimeString }</p>
      <p className='date-posted'>{ relativeDateTimeString }</p>

      <p className='message'>{ post.message }</p>

      {/* choose one format later */}
      <p className='likes'>{ likes_formatted }</p>
      {/* change this to be a link to see a list of all users who liked this */}
      <p className='test-likes-users'>{ likes_formatted_with_user_preview }</p>
      
      <button onClick={handleLikeSubmit} className={userLiked ? 'unlike-button' : 'like-button'}>{userLiked ? 'Unlike' : 'Like'}</button>
    </article>
  )
}

export default Post;
