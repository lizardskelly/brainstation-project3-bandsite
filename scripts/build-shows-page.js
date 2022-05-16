//shows array
let showsList = [
  {
    date: 'Mon Sept 06 2021 ',
    venue: 'Ronald Lane',
    location: 'San Francisco, CA'
  },
  {
    date: 'Tue Sept 21 2021 ',
    venue: 'Pier 3 East ',
    location: 'San Francisco, CA'
  },
  {
    date: 'Fri Oct 15 2021 ',
    venue: 'View Lounge ',
    location: 'San Francisco, CA'
  },
  {
    date: 'Sat Nov 06 2021',
    venue: 'Hyatt Agency ',
    location: 'San Francisco, CA'
  },
  {
    date: 'Fri Nov 26 2021',
    venue: 'Moscow Center ',
    location: 'San Francisco, CA'
  },
  {
    date: 'Wed Dec 15 2021 ',
    venue: 'Press Club',
    location: 'San Francisco, CA'
  }
];

// builds the list of shows for the shows page
const wrapper = document.querySelector('.shows__wrapper');
const showsBuilder = arr => {
  let i = 0
  while (i < arr.length) {
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
    dateInfo.innerHTML = arr[i].date;
    post.appendChild(dateInfo);

    let venueHeader = document.createElement('p');
    venueHeader.classList.add('shows__header');
    venueHeader.innerHTML = 'VENUE';
    post.appendChild(venueHeader);

    let venueInfo = document.createElement('p');
    venueInfo.classList.add('shows__info');
    venueInfo.innerHTML = arr[i].venue;
    post.appendChild(venueInfo);

    let locationHeader = document.createElement('p');
    locationHeader.classList.add('shows__header');
    locationHeader.innerHTML = 'LOCATION';
    post.appendChild(locationHeader);

    let locationInfo = document.createElement('p');
    locationInfo.classList.add('shows__info');
    locationInfo.innerHTML = arr[i].location;
    post.appendChild(locationInfo);

    let button = document.createElement('button');
    button.classList.add('shows__button');
    button.innerHTML = 'BUY TICKETS';
    post.appendChild(button);

    i++;
  }
};
showsBuilder(showsList);

//changes shows posting background color on selection
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