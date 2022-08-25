import { pausa } from "../helpers/inquirer.js";
import Tarea from "./tarea.js";

class Tareas {
    _listado = {};

    get listadoArray() {
        const listado = [];
        // Extrae todas las llaves de un objeto y retorna string[]
        Object.keys(this._listado).forEach( key => {
            // Obtener la tarea por id
            const tarea = this._listado[key];
            // Agregar tarea a la lista
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    eliminarTarea( id ) {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasArray(tareas = []) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        console.log();
        // Segundo parametro de foreach es el index
        this.listadoArray.forEach( (tarea, index) => {
            const idx = `${index + 1}.`.green;
            const { description, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${description} :: ${estado}`);

        });
    }

    listarPenditesCompletadas( option = true){
        console.log();
        let contador = 0;
        this.listadoArray.forEach( (tarea) => {
            const { description, completadoEn } = tarea;
            const estado = completadoEn ? `${completadoEn}`.green : 'Pendiente'.red;
            const completada = completadoEn ? true : false;
            if(completada === option){
                contador += 1;
                console.log(`${contador.toString().concat('.').green} ${description} :: ${estado}`);
            }
        });
        if(contador === 0){
            console.log('No hay tareaas para mostrar'.yellow);
        }
    }

    completarTarea( ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

        console.log('\nTarea(s) completada(s)'.green);
    }
}

export default Tareas