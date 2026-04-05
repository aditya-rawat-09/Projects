    function getprofiledata(username){
      return fetch(`https://api.github.com/users/${username}`)
        .then(raw => {
          if(!raw.ok) throw new Error("User Not Found");
          return raw.json();
        });
    }

    function getrepos(username){
      return fetch(`https://api.github.com/users/${username}/repos`)
        .then(raw => {
          if(!raw.ok) throw new Error("Failed to Fetch Repos");
          return raw.json();
        });
    }

    const searchbtn = document.querySelector('.searchbtn');
    const userinp = document.querySelector('.userinp');

    searchbtn.addEventListener('click', function() {
      const username = userinp.value.trim();
      const profileDiv = document.getElementById("profile");
      const repoSection = document.getElementById("repoSection");
      const errorMsg = document.getElementById("errorMsg");

      profileDiv.classList.add("hidden");
      repoSection.classList.add("hidden");
      errorMsg.classList.add("hidden");

      if (username.length > 0) {-
  
        getprofiledata(username)
          .then(data => {
            document.getElementById("avatar").src = data.avatar_url;
            document.getElementById("name").textContent = data.name || "No name";
            document.getElementById("userTag").textContent = "@" + data.login;
            document.getElementById("bio").textContent = data.bio || "No bio available";
            document.getElementById("followers").textContent = data.followers;
            document.getElementById("following").textContent = data.following;
            profileDiv.classList.remove("hidden");
          })
          .catch(() => {
            errorMsg.classList.remove("hidden");
          });


        getrepos(username)
          .then(repos => {
            const repoList = document.getElementById("repoList");
            repoList.innerHTML = "";

            if (repos.length === 0) {
              repoList.innerHTML = "<li>No public repositories.</li>";
            } else {
              repos.forEach(repo => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a><br><small>${repo.description || "No description"}</small>`;
                repoList.appendChild(li);
              });
            }

            repoSection.classList.remove("hidden");
          })
          .catch(() => {
            errorMsg.classList.remove("hidden");
          });

      } else {
        alert("Please enter a GitHub username.");
      }
    });





