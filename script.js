
const input = document.getElementById('userName');
const searchButton = document.getElementById('searchButton');
const taskContainer = document.querySelector('.details-container');
const elementAvatar = document.querySelector('.avatar');
const profileButton  = document.querySelector('.profileButton');
const info = document.querySelector('.info-contents');
const ul = document.querySelectorAll('ul');
const aboutMe = document.querySelector('p');
const childNodes = taskContainer.querySelectorAll('*');

// "As the nodes are pre created so that when theh user clicks the button multiple times the nodes will not be created again and again 
// this loops makes all the children nodes of taskcontainer display : none;"
taskContainer.classList.toggle('display');
for(let i = 0; i<childNodes.length; i++ ){
    childNodes[i].classList.toggle('display');
}


//Our main process starts when the search button is clicked
//here the function is defined as asynchronous as we will have to wait for fetch to be able to add details to teh nodes.
searchButton.onclick = async () => {
   
    //fetching
    let path = 'https://api.github.com/users/' + input.value;
    let response = await fetch(path);
    let details = await response.json();

    //response.ok returns true when the fetch has been completed sucessfully and the if statement runs
    if(response.ok){
        let github_url = details.html_url;
        let name = details.name;
        let avatar = details.avatar_url;
        let bio = details.bio;
        let youtubeLink = details.blog;
        let company = details.company;
        let followers = details.followers;
        let following = details.following;
        let public_repos = details.public_repos;
        let public_gists = details.public_gists;
        let location = details.location;
        let twitter = details.twitter_username;
            
        
        taskContainer.classList.remove('display');
        for(let i = 0; i<childNodes.length; i++ ){
        childNodes[i].classList.remove('display');
        }
            
            
        elementAvatar.style.background = `url("${avatar}") center center/ cover`;
        profileButton.setAttribute("href", "https://github.com/"+input.value);
        profileButton.setAttribute("target","_blank");
        ul[0].innerHTML = `<li> <b>Name</b> : ${name} </li> <li> <b>Company</b> : ${company} </li> <li> <b>Location</b> : ${location} </li>`
        aboutMe.innerHTML = `Bio : ${bio}`;

        if(twitter === null){
            twitter = "";
        }

        ul[1].innerHTML = ` <li><i class="fa-solid fa-users-line"></i>Followers : ${followers}</li>
                            <li><i class="fa-solid fa-user-group"></i>Following : ${following}</li>
                            <li>Public-repos : ${public_repos}</li>
                            <li>Public-gists : ${public_gists} </li>
                            <li><i class="fa-solid fa-globe"></i><a href="${youtubeLink}" target=”_blank”>${youtubeLink}</a></li>
                            <li><i class="fa-brands fa-x-twitter"></i><a href="https://twitter.com/${twitter}" target=”_blank”>Twitter</a></li>`;
    }
    //else response.ok return false in which the else case would be run which prints a dialog box that lets user know that the user was not found
    else{

        let errorBox = document.querySelector('.errorBox');
        errorBox.classList.remove('display');

        errorBox.innerHTML = `<i style="margin: 0px 10px 0px 10px;" class="fa-solid fa-circle-exclamation"></i> <p>User not found.</p>`;

        //removes the dialog box that appears after 3s.
        setTimeout(()=>errorBox.classList.add('display'),3000);
    }
    
}