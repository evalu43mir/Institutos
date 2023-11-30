import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioManualidad = document.querySelector('#Formulario-Manualidad');

    formularioManualidad.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioManualidad['Nombre-Manualidad'].value;
        const TIPO = formularioManualidad['Tipo-Manualidad'].value;
        const MATERIALES = formularioManualidad['Materiales-Manualidad'].value;
        const DESCRIPCION = formularioManualidad['Descripcion-Manualidad'].value;
        const FECHA_CREACION = formularioManualidad['FechaCreacion-Manualidad'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevaManualidadRef = await addDoc(collection(db, 'Manualidades'), {
                Nombre: NOMBRE,
                Tipo: TIPO,
                Materiales: MATERIALES,
                Descripcion: DESCRIPCION,
                FechaCreacion: FECHA_CREACION
            });

            // Muestra un mensaje si todo sale bien
            alert(`La manualidad ${NOMBRE} ha sido registrada exitosamente`);

            // Limpia el formulario
            formularioManualidad.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar la manualidad:', 'noValido');
        }
    });
});
