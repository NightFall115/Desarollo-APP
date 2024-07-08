import { getData, getDocumento, remove, save, update } from './firestore.js';

let id = 0;

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault();
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const usr = {
            run: document.getElementById('run').value,
            nombre: document.getElementById('nombre').value,
            apellido_P: document.getElementById('apellido_P').value,
            apellido_M: document.getElementById('apellido_M').value,
            genero: document.getElementById('genero').value,
            departamento: document.getElementById('departamento').value,
            cargo: document.getElementById('cargo').value,
            fecha: document.getElementById('fecha').value,
            fecha_ter: document.getElementById('fecha_ter').value,
            nombre_c: document.getElementById('nombre_c').value,
            fono: document.getElementById('fono').value,
            email: document.getElementById('email').value,
            contra: document.getElementById('contra').value,
        };
        console.log(usr)
          try {
            if (id === 0) {
                await save(usr);
                Swal.fire('Guardado', '', 'success');
            } else {
                await update(id, usr);
                Swal.fire('Actualizado', '', 'success');
            }
            limpiar();
        } catch (error) {
            console.error('Error al registrar Usuarios:', error);
            Swal.fire('Error', 'No se pudo registrar al usuario.', 'error');
        }
        id = 0;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getData((snapshot) => {
        let tabla = '';
        snapshot.forEach((usr) => {
            const datos = usr.data();
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
                <td nowrap>
                    <button class="btn btn-warning" id="${usr.id}">Editar</button>
                    <button class="btn btn-danger" id="${usr.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await remove(btn.id);
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id);
                const usr = doc.data();
                document.getElementById('run').value = usr.run;
                document.getElementById('nombre').value = usr.nombre;
                document.getElementById('apellido_P').value = usr.apellido_P;
                document.getElementById('apellido_M').value = usr.apellido_M;
                document.getElementById('genero').value = usr.genero;
                document.getElementById('departamento').value = usr.departamento;
                document.getElementById('cargo').value = usr.cargo;
                document.getElementById('fecha').value = usr.fecha;
                document.getElementById('fecha_ter').value = usr.fecha_ter;
                document.getElementById('nombre_c').value = usr.nombre_c;
                document.getElementById('fono').value = usr.fono;
                document.getElementById('email').value = usr.email;
                document.getElementById('contra').value = usr.contra;
                id = doc.id;
                const idElement = document.getElementById('id');
                if (idElement) {
                    idElement.readOnly = true;
                }

                document.getElementById('btnSave').value = 'Editar';
            });
        });
    });
});

function limpiar() {
    document.querySelectorAll('.form-control').forEach(item => {
        item.value = '';
    });
    const idElement = document.getElementById('id');
    if (idElement) {
        idElement.readOnly = false;
    }
}