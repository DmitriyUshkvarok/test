import onUserInfo from './template/userInfo.hbs';
import { Notify } from 'notiflix';
const searchBox = document.querySelector('.search-box');
const profileSection = document.querySelector('.profile-section');
// function fetchUser(userName) {
//   return fetch(`https://api.github.com/users/${userName}`).then(response =>
//     response.json()
//   );
// }

function fetchUser(userName) {
  return fetch(`https://api.github.com/users/${userName}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

searchBox.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const userName = event.srcElement.login.value.trim();

  if (!userName) {
    userName.innerHTML = '';
    Notify.failure('Oops, there is no country with that name');
    return;
  }
  fetchUser(userName).then(showProfile).catch(onError);
  event.target.reset();
}

function showProfile(someDate) {
  const markup = onUserInfo(someDate);
  profileSection.innerHTML = markup;
}

function onError(error) {
  if (error) {
    Notify.failure('Oops, there is no country with that name');
  }
}

//   avatar_url,
//   company,
//   login,
//   bio,
//   public_repos,
//   location,
//   html_url,
// }) {
//   profileSection.innerHTML = `<div class="user-box">
//         <img
//           class="user-img"
//           src="${avatar_url}"
//           alt="${company}"
//           width="300"
//         />
//         <h2 class="user-title">${login}</h2>
//         <p class="user-info">${bio}</p>
//         <p class="user-repository">${public_repos}</p>
//         <p class="user-location">${location}</p>
//         <p> <a href="${html_url}">${html_url}</a></p>
//       </div>`;
// }
