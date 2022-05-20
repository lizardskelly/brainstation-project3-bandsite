let authKey
// retrieves and sets authentication key
const retrieveAuthKey = () => {
  return axios.get('https://project-1-api.herokuapp.com/register')
    .then(response => {
      authKey = response.data.api_key;
    })
}

// retrieving comment data from API
const getComments = () => {
  return axios.get('https://project-1-api.herokuapp.com/comments?api_key=' + authKey)
    .then(response => {
      renderComments(response.data);
    })
}

// clears all comments on the page so they can be
// redisplayed with the updated comment array
const clearComments = postParent => {
  while (postParent.firstChild) {
    postParent.removeChild(postParent.firstChild);
  }
}

// function takes values from objects in comment array
// and builds them to be rendered later
const displayComment = (postParent, comment) => {
  const post = document.createElement('div');
  post.classList.add("post");
  postParent.prepend(post);
  
  // creates the various elements of each post,
  // sets them to the proper values pulled from the array,
  // and appends them to the dom in the proper locations
  let userAvatar = document.createElement('img');
  userAvatar.classList.add('post__avatar');
  userAvatar.setAttribute('src', '../assets/images/avatar-placeholder.jpg');
  post.appendChild(userAvatar);

  let textWrapper = document.createElement('div');
  textWrapper.classList.add('post__text-wrapper');
  post.appendChild(textWrapper);

  let infoWrapper = document.createElement('div');
  infoWrapper.classList.add('post__info-wrapper');
  textWrapper.appendChild(infoWrapper);

  let name = document.createElement('p');
  name.classList.add('post__username');
  name.innerHTML = comment.name;
  infoWrapper.appendChild(name);

  let time = document.createElement('p');
  time.classList.add('post__timestamp');
  time.innerHTML = formattedDate(comment.timestamp);
  infoWrapper.appendChild(time);

  let text = document.createElement('p');
  text.classList.add('post__text');
  text.innerHTML = comment.comment;
  textWrapper.appendChild(text);
}

//formats the date timestamp to something readable
const formattedDate = timestamp => {
  const timeNum = Number(timestamp);
  const date = new Date(timeNum);
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

//renders the comments on the page
const renderComments = comments => {
  const postParent = document.getElementById("postParent");

  clearComments(postParent);

  //sorts received comments in descending timestamp order
  const sortedComments = comments.sort((a, b) => {
    return a.timestamp - b.timestamp;
  })
  
  for (i = 0; i < sortedComments.length; i++) {
    displayComment(postParent, sortedComments[i]);
  }
}

// form submission event listener 
const commentForm = document.querySelector('.comments__form');
commentForm.addEventListener('submit', submitComment = event => {
  event.preventDefault();

  // clears any active errors
  document.getElementById('username').classList.remove('comments__input--error');
  document.getElementById('comment-body').classList.remove('comments__input--error');

  let newComment = {};

  // checks username input for errors and sets value if good
  const username = event.target.username.value;
  if(username.length > 0) {
    newComment.name = username;
  } else {
    document.getElementById('username').classList.add('comments__input--error');
    return;
  }

  //checks comment body input for errors and sets value if good
  const commentBody = event.target.commentBody.value;
  if (commentBody.length > 0) {
    newComment.comment = commentBody;
  } else {
    document.getElementById('comment-body').classList.add('comments__input--error');
    return;
  }

  // posts the new comment to the api
  postComment(newComment);

  // resets the form and displays the new comment
  commentForm.reset();
});

const postComment = (comment) => {
  return axios.post(
    'https://project-1-api.herokuapp.com/comments?api_key=' + authKey,
    comment,
    {headers: {'content-type': 'application/json'}}
  ).then(getComments)
}

retrieveAuthKey().then(getComments);