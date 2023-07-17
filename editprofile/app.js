import { onAuthStateChanged, auth, doc, db, getDoc, getStorage, ref, getDownloadURL , storage} from '../firebasconfig.js';

const firestName = document.querySelector('#firestName');
const surName = document.querySelector('#surName');
const gender = document.querySelector('#gender');
const profilepic = document.querySelector('#profilepic');
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

const metadata = {
  contentType: 'image/jpeg'
};

submit.addEventListener('click', () => {
  const storage = getStorage();
  const starsRef = ref(storage, profilepic.files[0], metadata);

  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
    })
    .catch((error) => {
      // Handle errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
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
