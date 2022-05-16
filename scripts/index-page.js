// building the comment array with its placeholder posts
// note: im setting the avatar to my placeholder asset
// because i'm assuming with the next sprint the api we use
// will include differing user avatars
let commentArray = [
  {
    username: "Miles Acosta",
    timestamp: "12/20/2020",
    avatar: "./assets/images/avatar-placeholder.jpg",
    commentBody: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
  },
  {
    username: "Emilie Beach",
    timestamp: "01/09/2021",
    avatar: "./assets/images/avatar-placeholder.jpg",
    commentBody: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
  },
  {
    username: "Conner Walton",
    timestamp: "02/17/2021",
    avatar: "./assets/images/avatar-placeholder.jpg",
    commentBody: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
  }
];

// clears all comments on the page so they can be
// redisplayed with the updated comment array
const clearComments = postParent => {
  while (postParent.firstChild) {
    postParent.removeChild(postParent.firstChild);
  }
}

// function takes values from objects in comment array
// and displays them in the comments section
const displayComment = (postParent, comment) => {
  const post = document.createElement('div');
  post.classList.add("post");
  postParent.prepend(post);

  // creates the various elements of each post,
  // sets them to the proper values pulled from the array,
  // and appends them to the dom in the proper locations
  let userAvatar = document.createElement('img');
  userAvatar.classList.add('post__avatar');
  userAvatar.setAttribute('src', comment.avatar);
  post.appendChild(userAvatar);

  let textWrapper = document.createElement('div');
  textWrapper.classList.add('post__text-wrapper');
  post.appendChild(textWrapper);

  let infoWrapper = document.createElement('div');
  infoWrapper.classList.add('post__info-wrapper');
  textWrapper.appendChild(infoWrapper);

  let name = document.createElement('p');
  name.classList.add('post__username');
  name.innerHTML = comment.username;
  infoWrapper.appendChild(name);

  let time = document.createElement('p');
  time.classList.add('post__timestamp');
  time.innerHTML = comment.timestamp;
  infoWrapper.appendChild(time);

  let text = document.createElement('p');
  text.classList.add('post__text');
  text.innerHTML = comment.commentBody;
  textWrapper.appendChild(text);
}

const displayComments = comments => {
  const postParent = document.getElementById("postParent");

  clearComments(postParent);

  for (i = 0; i < comments.length; i++) {
    displayComment(postParent, comments[i]);
  }
}
displayComments(commentArray);

// form submission event listener 
const commentForm = document.querySelector('.comments__form');
commentForm.addEventListener('submit', submitComment = event => {
  event.preventDefault();

  // clears any active errors
  document.getElementById('username').classList.remove('comments__input--error');
  document.getElementById('comment-body').classList.remove('comments__input--error');

  let newPost = {};

  // checks username input for errors and sets value if good
  const username = event.target.username.value;
  if(username.length > 0) {
    newPost.username = username;
  } else {
    document.getElementById('username').classList.add('comments__input--error');
    return;
  }
  
  newPost.timestamp = Date.now();
  // sets the avatar to the src of the avatar on the page
  // i'm assuming we'll define the src as an image from
  // the api in the next sprint
  let userAvatar = document.querySelector('.comments__form-avatar');
  newPost.avatar = userAvatar.src

  //checks comment body input for errors and sets value if good
  const commentBody = event.target.commentBody.value;
  if (commentBody.length > 0) {
    newPost.commentBody = commentBody;
  } else {
    document.getElementById('comment-body').classList.add('comments__input--error');
    return;
  }

  // adds the new comment object the comment array
  commentArray.push(newPost);

  // resets the form and displays the new comment
  commentForm.reset();
  displayComments(commentArray);
});