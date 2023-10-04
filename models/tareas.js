const Tarea = require("./Tarea");

class Tareas{
    constructor(){
        this._listado = {};
    }

    crearTarea(descripcion){
        const tarea = new Tarea(descripcion);
        this._listado = {...this.listado, [tarea.id]: tarea};
    }

    get listado() {
        return this._listado;
    }

    llenarListado(data){
        data.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            console.log( `${(i+1).toString().green}. ${tarea.descripcion} :: ${tarea.completadaEn? 'Completada'.green : 'Pendiente'.red}`)
        });
    }

    listarCompletadasPendientes(completadas = true){
        console.log();
        this.listadoArr.filter((tarea) => {
            return completadas? tarea.completadaEn !== null : tarea.completadaEn === null
        }).forEach((tarea, i) => {
            console.log( `${(i+1).toString().green}. ${tarea.descripcion} :: ${tarea.completadaEn? tarea.completadaEn.green : 'Pendiente'.red}`)
        })
    }

    get listadoArr(){
        return Object.keys(this._listado).map((key) => this._listado[key]);
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    completarTareas(ids = []){
        Object.keys(this._listado).forEach((key) => {
            if(ids.includes(key)){
                this._listado[key].completadaEn = new Date().toISOString();
            }else{
                this._listado[key].completadaEn = null;
            }
        })
    }

    
}

module.exports = Tareas;