import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioInstitucion = document.querySelector('#Formulario-Institucion');

    formularioInstitucion.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioInstitucion['Nombre-Institucion'].value;
        const UBICACION = formularioInstitucion['Ubicacion-Institucion'].value;
        const DIRECTOR = formularioInstitucion['Director-Institucion'].value;
        const FECHA_FUNDACION = formularioInstitucion['FechaFundacion-Institucion'].value;
        const CLAVE = formularioInstitucion['Clave-Institucion'].value;

        try {
            const nuevaInstitucionRef = await addDoc(collection(db, 'Instituciones'), {
                Nombre: NOMBRE,
                Ubicacion: UBICACION,
                Director: DIRECTOR,
                FechaFundacion: FECHA_FUNDACION,
                ClaveInstituto: CLAVE
            });

            alert(`La institución ${NOMBRE} ha sido registrada exitosamente`);
            formularioInstitucion.reset();
        } catch (error) {
            alert('Error al registrar la institución:', 'noValido');
        }
    });
});
