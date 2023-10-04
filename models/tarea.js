const {v4: uuidv4} = require('uuid');

class Tarea{

    constructor(descripcion){
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadaEn = null;
    }

}

module.exports = Tarea;