import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC2Mhm35Uj2ATVB3jjo436Edsi52RPYv7c",
  authDomain: "fir-notifications-c58ba.firebaseapp.com",
  projectId: "fir-notifications-c58ba",
  storageBucket: "fir-notifications-c58ba.appspot.com",
  messagingSenderId: "345854831633",
  appId: "1:345854831633:web:b396623a9aa67a2b3655b0"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BHGPr3pJQSflJAJtTIVXbmcEXlPV_HP29TZQRcqrGCN10gKIa-ojIJmtvM9kQGcsNKsWIA6ezKFG8Bd6LTjaVc0'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});