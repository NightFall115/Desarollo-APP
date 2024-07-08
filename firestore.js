import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAdShRMTQRXB6M5NNcozQxMwTTr1DvPosY",
    authDomain: "desarrollo-app-e706f.firebaseapp.com",
    projectId: "desarrollo-app-e706f",
    storageBucket: "desarrollo-app-e706f.appspot.com",
    messagingSenderId: "575078815782",
    appId: "1:575078815782:web:079943faf5f51187bf6ee7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = async (usuario) => {
    await addDoc(collection(db, 'usuario'), usuario);
};

export const getData = (data) => {
    onSnapshot(collection(db, 'usuario'), data);
};

export const remove = async (id) => {
    await deleteDoc(doc(db, 'usuario', id));
};

export const getDocumento = async (id) => {
    return await getDoc(doc(db, 'usuario', id));
};

export const update = async (id, usr) => {
    await updateDoc(doc(db, 'usuario', id), usr);
};