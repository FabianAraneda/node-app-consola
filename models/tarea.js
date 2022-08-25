import { v4 as uuidv4} from "uuid";

class Tarea {
    id = '';
    description = '';
    completadoEn = null;

    constructor( description ) {
        this.id = uuidv4();
        this.description = description;
    }
}


export default Tarea