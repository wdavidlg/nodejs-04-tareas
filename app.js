
const { inquirerMenu, inquirerPause, input, menuBorrar, confirmar, menuChecklist } = require('./helpers/vistas');
const { guardarDB, leerDB } = require('./models/db');
const Tareas = require('./models/tareas')

require('colors');
console.clear();

const main = async () => {
    let opcion = '';
    const tareas = new Tareas();
    tareas.llenarListado(leerDB())

    do {
        opcion = await inquirerMenu();
        switch (opcion) {
            case '1':
                //Crear tarea
                const desc = await input('Descripcion');
                tareas.crearTarea(desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto()
                break;
            case '3':
                //Listar completadas
                tareas.listarCompletadasPendientes(true);
                break;
            case '4':
                //Listar pendientes
                tareas.listarCompletadasPendientes(false);
                break;
            case '5':
                //Completar tareas
                const ids = await menuChecklist(tareas.listadoArr);
                tareas.completarTareas(ids);
                break;
            case '6':
                //Borrar tarea
                const id = await menuBorrar(tareas.listadoArr);
                const ok = await confirmar('¿Estas seguro?');
                if(ok){
                    if(id !== '0'){
                        tareas.borrarTarea(id);
                    }
                }
                break;
            default:
                break;
        }
        guardarDB(tareas.listadoArr);
        await inquirerPause();
    } while (opcion !== '0');

}

main();