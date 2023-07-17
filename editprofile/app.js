import { onAuthStateChanged, auth, doc, db, getDoc } from '../firebasconfig.js'

const firestName = document.querySelector('#firestName')
const surName = document.querySelector('#surName')
const datoofbirth = document.querySelector('#datoofbirth')
const gender = document.querySelector('#gender')
const male = document.querySelector('#male')
const female = document.querySelector('#female')
const profilepic = document.querySelector('#profilepic')
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


submit.addEventListener('click', () => {
    console.log(firestName.value);
    console.log(surName.value);
    console.log(datoofbirth.value);
    console.log(gender.value);
    console.log(male.value);
    console.log(female.value);
    console.log(profilepic.value);
})


async function displayUserInfo(user) {
    const docRef = doc(db, "user", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        var { iFirstName, iSurnameName, dateofbirthdatevalue, dateofbirthyearvalue , dateofbirthmonthvalue, gender: usergender } = docSnap.data();

        firestName.placeholder = iFirstName
        surName.placeholder = iSurnameName
        dateofbirthdate.placeholder = dateofbirthdatevalue + " Date"
        dateofbirthyear.placeholder = dateofbirthyearvalue + " Year"
        dateofbirthmonth.value = dateofbirthmonthvalue
        gender.value = usergender
        console.log(docSnap.data());

    } else {
        console.error("No such document!");
    }
}

