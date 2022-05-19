let authKey
// retrieves and sets authentication key
const retrieveAuthKey = () => {
  return axios.get('https://project-1-api.herokuapp.com/register')
    .then(response => {
      authKey = response.data.api_key;
    })
}

// retrieving show data from API
const getShows = () => {
  return axios.get('https://project-1-api.herokuapp.com/showdates?api_key=' + authKey)
    .then(response => {
      renderShows(response.data);
    })
}

// builds the list of shows for the shows page
const renderShows = shows => {
  const wrapper = document.querySelector('.shows__wrapper');
  for (i = 0; i < shows.length; i++) {
    const show = shows[i];
    // creates the post element and appends it to the wrapper
    let post = document.createElement('div');
    post.classList.add('shows__posting');
    wrapper.appendChild(post);

    // creates info elements using data
    // from array and appends them to the
    // proper places in the post element
    let dateHeader = document.createElement('p');
    dateHeader.classList.add('shows__header');
    dateHeader.innerHTML = 'DATE';
    post.appendChild(dateHeader);

    let dateInfo = document.createElement('p');
    dateInfo.classList.add('shows__info', 'shows__info--bold');
    dateInfo.innerHTML = formattedDate(show.date);
    post.appendChild(dateInfo);

    let venueHeader = document.createElement('p');
    venueHeader.classList.add('shows__header');
    venueHeader.innerHTML = 'VENUE';
    post.appendChild(venueHeader);

    let venueInfo = document.createElement('p');
    venueInfo.classList.add('shows__info');
    venueInfo.innerHTML = show.place;
    post.appendChild(venueInfo);

    let locationHeader = document.createElement('p');
    locationHeader.classList.add('shows__header');
    locationHeader.innerHTML = 'LOCATION';
    post.appendChild(locationHeader);

    let locationInfo = document.createElement('p');
    locationInfo.classList.add('shows__info');
    locationInfo.innerHTML = show.location;
    post.appendChild(locationInfo);

    let button = document.createElement('button');
    button.classList.add('shows__button');
    button.innerHTML = 'BUY TICKETS';
    post.appendChild(button);
  }
  setClickEvents();
};

//changes shows posting background color on selection
const setClickEvents = () => {
  const showList = document.querySelectorAll('.shows__posting');
  for(i = 0; i < showList.length; i++) {
    const show = showList[i];
    show.addEventListener("click", event => {
      const previouslySelected = document.querySelector('.shows__posting--selected');
      if (previouslySelected) {
        previouslySelected.classList.remove('shows__posting--selected');
      }
      show.classList.add('shows__posting--selected');
    })
  }
}

//formats the date to something readable
const formattedDate = timestamp => {
  const timeNum = Number(timestamp);
  const date = new Date(timeNum);
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

// runs the code
retrieveAuthKey().then(getShows);