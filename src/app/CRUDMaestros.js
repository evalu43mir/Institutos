import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Instituciones = document.querySelector('.Instituciones');
const FormularioActualizarInstitucion = document.querySelector('#Formulario-ActualizarInstitucion');

const obtenerInstitucion = (id) => getDoc(doc(db, 'Instituciones', id));

let id = '';

// Nueva función para actualizar institución
const actualizarInstitucion = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Instituciones', id), nuevosValores);
        alert('Institución actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la institución', 'error');
    }
};

export const MostrarListaInstituciones = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Institucion = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre de la institución: ${Institucion.Nombre} </h5>
                    <p> Ubicación: ${Institucion.Ubicacion} </p>
                    <p> Director: ${Institucion.Director} </p>
                    <p> Fecha de Fundación: ${Institucion.FechaFundacion} </p>
                    <p> Clave del Instituto: ${Institucion.ClaveInstituto} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Institucion" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Institucion" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarInstitucion"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Instituciones.innerHTML = html;

        const BotonesEliminar = Instituciones.querySelectorAll('.Eliminar-Institucion');

        // ELIMINAR INSTITUCIONES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Instituciones', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la institución:', 'error');
                }
            });
        });

        const BotonesActualizar = Instituciones.querySelectorAll('.Actualizar-Institucion');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerInstitucion(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarInstitucion['Actualizar-Nombre'];
                const UBICACION = FormularioActualizarInstitucion['Actualizar-Ubicacion'];
                const DIRECTOR = FormularioActualizarInstitucion['Actualizar-Director'];
                const FECHA_FUNDACION = FormularioActualizarInstitucion['Actualizar-FechaFundacion'];
                const CLAVE_INSTITUTO = FormularioActualizarInstitucion['Actualizar-ClaveInstituto'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                UBICACION.value = DATOSDOCUMENTO.Ubicacion;
                DIRECTOR.value = DATOSDOCUMENTO.Director;
                FECHA_FUNDACION.value = DATOSDOCUMENTO.FechaFundacion;
                CLAVE_INSTITUTO.value = DATOSDOCUMENTO.ClaveInstituto;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la institución al enviar el formulario
        FormularioActualizarInstitucion.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarInstitucion['Actualizar-Nombre'].value;
                const UBICACION = FormularioActualizarInstitucion['Actualizar-Ubicacion'].value;
                const DIRECTOR = FormularioActualizarInstitucion['Actualizar-Director'].value;
                const FECHA_FUNDACION = FormularioActualizarInstitucion['Actualizar-FechaFundacion'].value;
                const CLAVE_INSTITUTO = FormularioActualizarInstitucion['Actualizar-ClaveInstituto'].value;

                await actualizarInstitucion(id, {
                    Nombre: NOMBRE,
                    Ubicacion: UBICACION,
                    Director: DIRECTOR,
                    FechaFundacion: FECHA_FUNDACION,
                    ClaveInstituto: CLAVE_INSTITUTO,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarInstitucion');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Instituciones.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
