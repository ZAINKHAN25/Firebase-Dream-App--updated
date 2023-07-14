import { auth , onAuthStateChanged , signOut } from "../firebasconfig.js";

var body = document.querySelector('body')
var modalbody = document.querySelector('.modalbody')
var modaltwoboy = document.querySelector('.modaltwoboy')

let isLoggedInUser = JSON.parse(localStorage.getItem("lOGINUSER")) || [];
console.log(JSON.parse(localStorage.getItem("lOGINUSER")))

document.addEventListener("DOMContentLoaded", function () {
    if (isLoggedInUser) {
      console.log(isLoggedInUser)

      displayUserInfo(isLoggedInUser);

      let posts = JSON.parse(localStorage.getItem("posts")) || [];

      displayPosts(posts);


    } else {
      window.location.href = "../index.html";
      console.log(isLoggedInUser)
    }
});

document.getElementById('nikalnahhai').addEventListener('click', function() {
  var postInputBox = document.getElementById('postInputBox');
  postInputBox.focus();
});

function displayUserInfo(user) {
  document.getElementById("userName").textContent = user.iFirstName + ' ' + user.iSurnameName;
  document.getElementById("emailAddress").textContent = user.email;
  document.getElementById("mobNum").textContent = user.mobilenumsignup;
  document.getElementById("gender").textContent = user.gender;
  document.getElementById("description").textContent = user.description || "No Description Added";
}

var no2pagalhaiyebutton = document.querySelector('.no2pagalhaiyebutton')
no2pagalhaiyebutton.addEventListener('click', postHandler)

function postHandler() {
  const nikalnahhai = document.querySelector('#nikalnahhai')
  const postInput = document.getElementById("postInputBox");
  const postContent = postInput.value;

  nikalnahhai.focuses = postContent.focuses;

  if (postContent.trim() !== "") {
    const post = {
      id: Date.now(),
      content: postContent,
      email: isLoggedInUser.mobilenumsignup,
      userNameu: isLoggedInUser.iFirstName + " " + isLoggedInUser.iSurnameName,
      description: isLoggedInUser.description  || "No description Added",
      date: new Date().getDate(),
      imgsource: isLoggedInUser.profilePicture || "../assests/avatar.png" // Set the profile picture source or default avatar image
    };
    

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    
    displayPosts(posts);
    
    postInput.value = "";
    body.classList.remove('overflowhidden')
    modalbody.classList.add('none')
  }
}

function displayPosts(posts) {
  const postArea = document.getElementById("postAreaId");
  postArea.innerHTML = "";
  
  for (let post of posts) {
    const div = document.createElement("div");
div.className = "post";
div.innerHTML = `
  <div class="firstdivofpost">
    <div class="imgarea">
      <img src="${post.imgsource}" class="postimg loginuserpostimage" alt="">
    </div>
    <div class="colomnwalakam">
      <div class="span1offirslline">${post.userNameu}</div>
      <div class="span2offirslline">${post.description}</div>
      <div class="span3offirslline">${post.date} hours ago</div>
    </div>
  </div>
  <div class="seconddivofpost">${post.content}</div>
  <div class="thirddivofpost">
    <span><i class="fa-regular gapfromside fa-heart"></i>PHOTOS</span>
    <span><i class="fa-solid fa-share-from-square"></i>SHARE</span>
    <span><i class="fa-regular gapfromside fa-comment-dots"></i>COMMENT</span>
  </div>
`;
    console.log(post)
    postArea.prepend(div);
  }
}

var logoutbtn = document.querySelector('.logoutbtn')
logoutbtn.addEventListener("click", logout)

function logout() {
  signOut(auth).then(() => {
    localStorage.removeItem("LOGINUSER");
  window.location.href = "../index.html";
  }).catch((error) => {
    console.log(error)
  });
  
  
}

var navbarScrollingDropdowntag = document.querySelector('.navbarScrollingDropdowntag')

navbarScrollingDropdowntag.addEventListener('click', navbarScrollingDropdown)

function navbarScrollingDropdown(){
    var dropdownItems = document.querySelectorAll('.dropdown-item');
    var dropdownkeclickperanewalelist = document.querySelectorAll('.dropdownkeclickperanewalelist');

    dropdownItems.forEach(function (item) {
        item.classList.toggle("none");
    });
    
    dropdownkeclickperanewalelist.forEach(function (item) {
        item.classList.toggle('removeborderandbackground');
})
}

var no1pagalhaiyebutton = document.querySelector('.no1pagalhaiyebutton')
no1pagalhaiyebutton.addEventListener('click', removemodalfoo )

function removemodalfoo(){
  modalbody.classList.add('none')
  body.classList.remove('overflowhidden')
}

var openmodalofpostimgbtn = document.querySelector('.openmodalofpostimgbtn')
openmodalofpostimgbtn.addEventListener('click', openmodalfoo)

function openmodalfoo() {
  var modalbody = document.querySelector('.modalbody');
  var userName = document.querySelector('.infonamemodal h2');
  var userMobNum = document.querySelector('.infonamemodal p');

  // Update the username and mobile number dynamically
  userName.textContent = isLoggedInUser.iFirstName + " " + isLoggedInUser.iSurnameName;
  userMobNum.textContent = isLoggedInUser.mobilenumsignup;
  body.classList.add('overflowhidden')
  modalbody.classList.remove('none');
}

var oipensecondmodalbtn = document.querySelector(".oipensecondmodalbtn")
oipensecondmodalbtn.addEventListener('click', opensecondmodalfoo)

function opensecondmodalfoo(){
  var modaltwoboy = document.querySelector('.modaltwoboy')

  body.classList.add('overflowhidden')
  modaltwoboy.classList.remove('none');
}

function removemodaltwofoo(){
  var modaltwoboy = document.querySelector('.modaltwoboy')
  
  body.classList.remove('overflowhidden')
  modaltwoboy.classList.add('none');

}

function bgmovewalafoo(id){
  var divofid = document.querySelector(`.${id}`)
  divofid.classList.add('removebgcolor')
}

function autobackgroundfoo(id){
  var divofid = document.querySelector(`.${id}`)
  divofid.classList.remove('removebgcolor')
}


var profilePictureUpperWala = document.querySelector('.profilePictureuppperwala');
var modalTwoBoy = document.querySelector('.modaltwoboy');
var loginPostImages = document.querySelectorAll('.loginuserpostimage');

profilePictureUpperWala.addEventListener('click', function() {
  modalTwoBoy.classList.remove('none');
});

function updateLoginProfile(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  
  reader.onload = function (e) {
    var imageSrc = e.target.result;
    
    loginPostImages.forEach(function(image) {
      image.src = imageSrc;
    });
  };
  
  reader.readAsDataURL(file);

}

var closeModalTwoBtn = document.querySelector('.closeModalTwoBtn')
closeModalTwoBtn.addEventListener('click', closeModalTwoFoo)

function closeModalTwoFoo() {
  var modaltwoboy = document.querySelector('.modaltwoboy')
  
  body.classList.remove('overflowhidden')
  modaltwoboy.classList.add('none');
}


function thecurrentuserisloggedin(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      
    } else {
      // User is signed out
      // ...
    }
  });
  
}