import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { onAuthStateChanged, auth, doc, db, getDoc } from '../firebasconfig.js';

import { getStorage , ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";



const firebaseConfig = {
  apiKey: "AIzaSyAM60KWvtkG839mU292mJzblIqWalqkkJo",
  authDomain: "social-media-app-7593f.firebaseapp.com",
  projectId: "social-media-app-7593f",
  storageBucket: "social-media-app-7593f.appspot.com",
  messagingSenderId: "57654938598",
  appId: "1:57654938598:web:616b84298b629aa89d2427"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const firestName = document.querySelector('#firestName');
const surName = document.querySelector('#surName');
const gender = document.querySelector('#gender');
const submit = document.querySelector('#submit');
const dateofbirthdate = document.querySelector('#dateofbirthdate');
const dateofbirthmonth = document.querySelector('#dateofbirthmonth');
const dateofbirthyear = document.querySelector('#dateofbirthyear');

let isLoggedInUser;

const thecurrentuserisloggedin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      displayUserInfo(uid);
      isLoggedInUser = user; // Store the logged-in user information
    } else {
      location.href = '../index.html';
    }
  });
};


thecurrentuserisloggedin();


submit.addEventListener('click', async () => {
  const profilepic = document.querySelector('#profilepic');
  const mountainsRef = ref(storage, `images/${profilepic.files[0].name}`);

  console.log(profilepic.files[0])


  // 'file' comes from the Blob or File API
  uploadBytes(mountainsRef, profilepic.files[0]).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
});

async function displayUserInfo(user) {
  const docRef = doc(db, 'user', user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    var { iFirstName, iSurnameName, dateofbirthdatevalue, dateofbirthyearvalue, dateofbirthmonthvalue, gender: usergender } =
      docSnap.data();

    firestName.placeholder = iFirstName;
    surName.placeholder = iSurnameName;
    dateofbirthdate.placeholder = dateofbirthdatevalue + ' Date';
    dateofbirthyear.placeholder = dateofbirthyearvalue + ' Year';
    dateofbirthmonth.value = dateofbirthmonthvalue;
    gender.value = usergender;
    console.log(docSnap.data());
  } else {
    console.error('No such document!');
  }
}
