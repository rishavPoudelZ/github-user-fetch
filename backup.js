const input = document.getElementById('userName');
const searchButton = document.getElementById('searchButton');

const taskContainer = document.querySelector('.details-container');
const elementAvatar = document.querySelector('.avatar');
const profileButton  = document.querySelector('.profileButton');
const info = document.querySelector('.info-contents');
const ul = document.querySelector('ul');
const aboutMe = document.querySelector('p');
const childNodes = taskContainer.querySelectorAll('*');

taskContainer.classList.toggle('display');
for(let i = 0; i<childNodes.length; i++ ){
    childNodes[i].classList.toggle('display');
}

searchButton.onclick = async () => {
   
    let path = 'https://api.github.com/users/' + input.value;
    let response = await fetch(path);
    let details = await response.json();

    if(response.ok){
        let github_url = details.html_url;
        let name = details.name;
        let avatar = details.avatar_url;
        let bio = details.bio;
        let youtubeLink = details.blog;
        let company = details.company;
        let followers = details.followers;
        let public_repos = details.public_repos;
        let public_gists = details.public_gists;
        let location = details.location;
            
        
        taskContainer.classList.remove('display');
        for(let i = 0; i<childNodes.length; i++ ){
        childNodes[i].classList.remove('display');
        }
            
            
        elementAvatar.style.background = `url("${avatar}") center center/ cover`;
        profileButton.setAttribute("href", `"${github_url}"`);
        ul.innerHTML = `<li> <b>Name</b> : ${name} </li> <li> <b>Company</b> : ${company} </li> <li> <b>Location</b> : ${location} </li>`
        aboutMe.innerHTML = `Bio : ${bio}`;
    }
    else{

        let errorBox = document.querySelector('.errorBox');
        errorBox.classList.remove('display');

        errorBox.innerHTML = `<i style="margin: 0px 10px 0px 10px;" class="fa-solid fa-circle-exclamation"></i> <p>User not found.</p>`;

        setTimeout(()=>errorBox.classList.add('display'),3000);
    }
    
}