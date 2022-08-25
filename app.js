import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, confirmarEliminar, opcionesEliminar, opcionesCompletar } from './helpers/inquirer.js';
import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';

const main = async () => {

    let opcion = 0;
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        tareas.cargarTareasArray(tareasDB);
    }

    do {
        //Imprimir el menu
        opcion = await inquirerMenu();

        switch (opcion) {
            case 1:
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listarTareas();
                break;
            case 3:
                tareas.listarPenditesCompletadas(true);
                break;
            case 4:
                tareas.listarPenditesCompletadas(false);
                break;
            case 5:
                const ids = await opcionesCompletar(tareas.listadoArray);
                tareas.completarTarea(ids);
                break;
            case 6:
                const id = await opcionesEliminar(tareas.listadoArray);
                if (id !== 0 ){
                    // Confirmacion para borrar
                    const confirmar = await confirmarEliminar('¿Está seguro de eliminar la tarea?');
                    if (confirmar){
                        tareas.eliminarTarea(id);
                        console.log('Tarea Eliminada');
                    }
                    break;
                }
        }

        guardarDB( tareas.listadoArray );

        await pausa();

    } while ( opcion !== 0 );
}

main();