// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwdxY1Grn-Ne2kwgpuEBuWuv_LpyJio-M',
  authDomain: 'what-s-for-dinner-41da2.firebaseapp.com',
  projectId: 'what-s-for-dinner-41da2',
  storageBucket: 'what-s-for-dinner-41da2.appspot.com',
  messagingSenderId: '40755183027',
  appId: '1:40755183027:web:bdc7fcf5f54a8cad111fc6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// configure Google provider
const provider = new GoogleAuthProvider();
// reference to firebase authentication instance
const auth = getAuth(app);


// login and logout workflows
function login () {
    return signInWithPopup(auth, provider);
}

function logout () {
    return signOut(auth, provider);
}


// export login/logout functionality
export { login, logout, auth };