async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (response.ok && response.status >= 200 && response.status < 300) {
    const daten = await response.json();
    return daten;
  }
  else
    return Error("Fehler beim bie GetUsers");

}

async function RenderUsers() {
  const users = await getUsers();
  const users_cont = document.querySelector(".users_main_cont");
  users.forEach(user => {
    let html =
      ` <div class="user" id="${user.id}">
          <div class="name_cont">
            <p class="name">${user.name}</p>
            <p class="email">${user.email}</p>
          </div>
        </div>`;
    users_cont.innerHTML += html;
  });
}

async function GetUserPosts($user_id) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/?userId=" + $user_id);
  if (response.ok && response.status >= 200 && response.status < 300) {
    const daten = await response.json();
    return daten;
  }
  else
    return Error("Fehler beim bie GetUserPosts");
}

function removeActiveClass() {
  const usersContainers = document.querySelectorAll(".user");
  usersContainers.forEach(user_cont => {
    user_cont.classList.remove("active");
  });
}
async function main() {
  await RenderUsers();
  const usersContainers = document.querySelectorAll(".user");
  usersContainers.forEach(user_cont => {
    user_cont.addEventListener("click", function () {
      removeActiveClass();
      user_cont.classList.add("active");
      //const posts = await GetUserPosts(user_cont.id);
      GetUserPosts(user_cont.id).then(posts => {
        const post_cont = document.querySelector(".posts_main_cont");
        post_cont.innerHTML = "";
        posts.forEach((post) => {
          let html =
            `<div class="post_cont">
              <h4 class="post_titel">${post.title}</h4>
              <p class="post_content">${post.body}</p>
            </div>`;
          post_cont.innerHTML += html;
        });
      });



    });
  });
}


main();

// console.log(getUsers());
// console.log(GetUserPosts(2));


