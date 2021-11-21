const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
let emailElement = document.getElementById("email");
let email = document.getElementById("email").value = "";
let usernameElement = document.getElementById("username");
let username = document.getElementById("username").value = "";
let error = document.getElementById("error"); 
let errorMsgEmail = document.getElementById("email-error");
let errorMsgUsername = document.getElementById("username-error");
let emailValid = false;
let usernameValid = false;
let users= [];
let form = document.getElementById("add-user");

form.addEventListener('submit', e => {
		e.preventDefault();
    checkEmail();
    checkUsername();
    if(emailValid && usernameValid === true){
  			addUser(username, email, userService);
    }
});

function checkEmail(){
    email = document.getElementById("email").value;
    if(regex.test(email)){
    		emailElement.className = "valid";
        errorMsgEmail.style.opacity = "0";
        emailElement.style.border = "2px solid #f0f0f0";
        emailValid = true;
    }else{
        emailElement.className = "invalid";
        errorMsgEmail.style.opacity = "1";
        emailElement.style.border = "2px solid red";
        emailValid = false;
    }
}

function checkUsername(){
    username = document.getElementById("username").value;
    if(username.length !== 0){
        usernameElement.className = "valid"
        errorMsgUsername.style.opacity = "0"
        usernameElement.style.border = "2px solid #f0f0f0";
        usernameValid = true;
    }else{
        usernameElement.className = "invalid"
        errorMsgUsername.style.opacity = "1";
        usernameElement.style.border = "2px solid red";
        usernameValid = false;
    }
}

function userService(response){
		if(response.success === true && usernameValid === true && emailValid == true){
      	error.style.opacity = "0";
        error.style.padding = "10px 0 5px";
    		users.push(response.user);
        console.log(response.user.username + ' was added!');
    		console.log(users);
      	console.log(response);
      	document.getElementById("users").innerHTML = '';
     
        for(let i = 0; i < users.length; i++){
        document.getElementById("users").innerHTML += '<li><span class="number">' + (i + 1) + '</span>. <div>Username: ' + JSON.stringify(users[i].username) + ' <br>Email: ' + JSON.stringify(users[i].email) + '</div></li>';
     }
      
    }else{
    		error.style.opacity = "1";
        error.style.padding = "10px 40px 5px";
    		console.log('Error! User was not added!');
    }
}

function addUser(username, email, callback) {
    var xhr = new XMLHttpRequest();
    var response;
    var success = (!!Math.round(Math.random()));
    
    if (!success){
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });   
    }
    
    xhr.open("POST", "/echo/json/");
    xhr.onload = function () {
    		if (xhr.status === 200) {
        		callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send("json=" + response);
}