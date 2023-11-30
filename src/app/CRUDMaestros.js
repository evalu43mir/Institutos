import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Manualidades = document.querySelector('.Manualidades');
const FormularioActualizarManualidad = document.querySelector('#Formulario-ActualizarManualidad');

const obtenerManualidad = (id) => getDoc(doc(db, 'Manualidades', id));

let id = '';

// Nueva función para actualizar manualidad
const actualizarManualidad = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Manualidades', id), nuevosValores);
        alert('Manualidad actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la manualidad', 'error');
    }
};

export const MostrarListaManualidades = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Manualidad = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre de la manualidad: ${Manualidad.Nombre} </h5>
                    <p> Tipo: ${Manualidad.Tipo} </p>
                    <p> Materiales: ${Manualidad.Materiales} </p>
                    <p> Descripción: ${Manualidad.Descripcion} </p>
                    <p> Fecha de Creación: ${Manualidad.FechaCreacion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Manualidad" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Manualidad" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarManualidad"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Manualidades.innerHTML = html;

        const BotonesEliminar = Manualidades.querySelectorAll('.Eliminar-Manualidad');

        // ELIMINAR MANUALIDADES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Manualidades', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la manualidad:', 'error');
                }
            });
        });

        const BotonesActualizar = Manualidades.querySelectorAll('.Actualizar-Manualidad');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerManualidad(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarManualidad['Actualizar-Nombre'];
                const TIPO = FormularioActualizarManualidad['Actualizar-Tipo'];
                const MATERIALES = FormularioActualizarManualidad['Actualizar-Materiales'];
                const DESCRIPCION = FormularioActualizarManualidad['Actualizar-Descripcion'];
                const FECHA_CREACION = FormularioActualizarManualidad['Actualizar-FechaCreacion'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                TIPO.value = DATOSDOCUMENTO.Tipo;
                MATERIALES.value = DATOSDOCUMENTO.Materiales;
                DESCRIPCION.value = DATOSDOCUMENTO.Descripcion;
                FECHA_CREACION.value = DATOSDOCUMENTO.FechaCreacion;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la manualidad al enviar el formulario
        FormularioActualizarManualidad.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarManualidad['Actualizar-Nombre'].value;
                const TIPO = FormularioActualizarManualidad['Actualizar-Tipo'].value;
                const MATERIALES = FormularioActualizarManualidad['Actualizar-Materiales'].value;
                const DESCRIPCION = FormularioActualizarManualidad['Actualizar-Descripcion'].value;
                const FECHA_CREACION = FormularioActualizarManualidad['Actualizar-FechaCreacion'].value;

                await actualizarManualidad(id, {
                    Nombre: NOMBRE,
                    Tipo: TIPO,
                    Materiales: MATERIALES,
                    Descripcion: DESCRIPCION,
                    FechaCreacion: FECHA_CREACION,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarManualidad');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Manualidades.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
