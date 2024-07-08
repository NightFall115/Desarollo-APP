import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAdShRMTQRXB6M5NNcozQxMwTTr1DvPosY",
    authDomain: "desarrollo-app-e706f.firebaseapp.com",
    projectId: "desarrollo-app-e706f",
    storageBucket: "desarrollo-app-e706f.appspot.com",
    messagingSenderId: "575078815782",
    appId: "1:575078815782:web:079943faf5f51187bf6ee7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "usuario"));
        let tabla = '';
        querySnapshot.forEach((doc) => {
            const datos = doc.data();
            console.log(datos)
            tabla += `<tr>
                <td>${datos.run}</td>
                <td>${datos.nombre}</td>
                <td>${datos.apellido_P}</td>
                <td>${datos.apellido_M}</td>
                <td>${datos.genero}</td>
                <td>${datos.departamento}</td>
                <td>${datos.cargo}</td>
                <td>${datos.fecha}</td>
                <td>${datos.fecha_ter}</td>
                <td>${datos.nombre_c}</td>
                <td>${datos.fono}</td>
            </tr>`;
        });
        document.getElementById('usuarios').innerHTML = tabla;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
});