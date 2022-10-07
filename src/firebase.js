import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { reactive } from 'vue';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: 'vue3-vue3_crud-1bbd3',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

//init firebase app
initializeApp(firebaseConfig);

//init service
export const db = getFirestore();

//collection reference
export const usersCol = collection(db, 'users');

//get collection data
export const getUserList = () => {
    const users = reactive([]);
    getDocs(usersCol)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
            });
            console.log(users);
        })
        .catch((err) => {
            console.log(err.message);
        });
    return users;
};

//get userID field
export const getUserID = () => {
    const userIdObj = reactive([]);
    getDocs(usersCol)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                const userId = data.UserID;
                userIdObj.push(userId);
            });
            console.log(userIdObj);
        })
        .catch((err) => {
            console.log(err.message);
        });
    return userIdObj;
};

export const toTimestamp = () => {
    const dateTimestamp = db.Timestamp.fromDate(new Date(s));
    return dateTimestamp;
};

//delete doc
export const deleteUser = (id) => {
    console.log(id);
    const delConfirm = confirm('Delete user data?');
    if (delConfirm) {
        deleteDoc(doc(db, 'users', id));
        alert('Deleted.');
    } else {
        alert('Cancelled.');
    }
};

//update doc
export const updateUser = (id, obj) => {
    const docRef = doc(db, 'users', id);
    updateDoc(docRef, obj);
    alert('Successfully updated!');
};
