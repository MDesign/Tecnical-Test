var body = document.getElementById('body');

createIndex();

//---------------------------ON CLICK SEARCH-------------------------------------
document.getElementById('searchSubmit').addEventListener('click', function () {
    searchUser();
    searchRepository();
});

//---------------------------CREATING HTML ELEMENTS IN JAVASCRIPT-------------------------------------
function createIndex() {
    var generalDiv = document.createElement('div');
    var searchDiv = document.createElement('div');
    var searchInput = document.createElement('input');
    var searchSubmit = document.createElement('div');
    var empty = document.createElement('div');

    generalDiv.setAttribute('class', 'generalDiv');
    generalDiv.setAttribute('id', 'generalDiv');
    searchDiv.setAttribute('class', 'searchDiv');
    searchInput.setAttribute('class', 'searchInput');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('placeholder', 'Search username...');
    searchSubmit.setAttribute('class', 'searchSubmit');
    searchSubmit.setAttribute('id', 'searchSubmit');
    empty.setAttribute('id', 'empty');
    empty.setAttribute('class', 'empty');

    searchSubmit.innerHTML = '<p>Search</p>'

    searchDiv.append(searchInput, searchSubmit);
    generalDiv.append(searchDiv, empty);
    body.append(generalDiv);
}

//---------------------------CALLING API FOR USER-------------------------------------
function searchUser() {
    var user = 'https://api.github.com/users/' + document.getElementById('searchInput').value;

    var request = new XMLHttpRequest();
    request.open('GET', user, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            console.log(data);
            //calling the function
            createInfo(data);
        } else {

            document.getElementById('empty').innerHTML = '';

            var error = document.createElement('div');

            error.setAttribute('class', 'error');

            error.innerHTML = 'Does not exist'

            document.getElementById('empty').append(error);
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

//---------------------------CREATING ELEMENTS FOR USER-------------------------------------
function createInfo(info) {
    document.getElementById('empty').innerHTML = '';

    var header = document.createElement('div');
    var avatar = document.createElement('img');
    var personalInfo = document.createElement('div');
    var username = document.createElement('div');
    var fullname = document.createElement('div');
    var bio = document.createElement('div');

    header.setAttribute('class', 'header');
    avatar.setAttribute('src', info.avatar_url);
    avatar.setAttribute('class', 'avatar');
    personalInfo.setAttribute('class', 'personalInfo');
    username.setAttribute('class', 'username');
    fullname.setAttribute('class', 'fullname');
    bio.setAttribute('class', 'bio');

    username.innerHTML = '@' + info.login;
    fullname.innerHTML = info.name;
    bio.innerHTML = info.bio;

    personalInfo.append(username, fullname, bio);
    header.append(avatar, personalInfo);

    document.getElementById('empty').append(header);

    validate(info.login, username, '@username');
    validate(info.name, fullname, 'Full Name');
    validate(info.bio, bio, 'This user has no bio...');
}

//---------------------------CALLING API FOR REPOS-------------------------------------
function searchRepository() {
    var repository = 'https://api.github.com/users/' + document.getElementById('searchInput').value + '/repos';

    var request = new XMLHttpRequest();
    request.open('GET', repository, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            console.log(data);
            createRepos(data)

        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

//---------------------------CREATING ELEMENTS FOR REPOS-------------------------------------
function createRepos(info) {
    var title = document.createElement('div');
    var repositories = document.createElement('div');

    title.setAttribute('class', 'title');
    repositories.setAttribute('class', 'repositories');

    title.innerHTML = 'Repositories';

    for (var i = 0; i < info.length; i++) {
        var reposDiv = document.createElement('div');
        var reposName = document.createElement('div');
        var stats = document.createElement('div');
        var star = document.createElement('div');
        var fork = document.createElement('div');

        reposDiv.setAttribute('class', 'reposDiv');
        reposName.setAttribute('class', 'reposName');
        stats.setAttribute('class', 'stats');
        star.setAttribute('class', 'star');
        fork.setAttribute('class', 'fork');

        reposName.innerHTML = info[i].name;
        star.innerHTML = '<i class="fas fa-star"></i>' + info[i].stargazers_count;
        fork.innerHTML = '<i class="fas fa-code-branch"></i>' + info[i].forks;


        stats.append(star, fork);
        reposDiv.append(reposName, stats);
        repositories.appendChild(reposDiv);
    }

    document.getElementById('empty').append(title, repositories);
}

//---------------------------FUNCTION VALIDATES IN CASE MISSING INPUTS-------------------------------------
function validate(object, place, description) {
    if (object == null) {
        place.append(description);
    } else {
        true
    }
}
