require('colors');
const inquirer = require('inquirer');

const questions = [
    {
        value: '1',
        name: `${'1.'.green} Crear tarea`
    },
    {
        value: '2',
        name: `${'2.'.green} Listar tareas`
    },
    {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
    },
    {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
    },
    {
        value: '5',
        name: `${'5.'.green} Completar tareas`
    },
    {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
    },
    {
        value: '0',
        name: `${'0.'.green} Salir`
    }
]


const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('===========================\n'.green);
    const {opcion} =  await inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: 'Elija una opcion',
        choices: questions
    }])

    return opcion;
}

const inquirerPause = async() => {
    console.log();
    await inquirer.prompt([{
        type: 'input',
        name: 'pause',
        message: `Presione ${'ENTER'.green} para continuar`
    }])
    return;
}

const input = async(message) => {
    const {entrada} = await inquirer.prompt([{
        type: 'input',
        name: 'entrada',
        message,
        validate(value) {
            if(value.length === 0){
                return 'Ingrese nuevamente'
            }
            return true;
        } 
    }]);
    return  entrada;
}

const menuBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${(i+1).toString().green}. ${tarea.descripcion}`
        }
    })
    choices.unshift({
        value: '0',
        name: `${'0'.green}. Cancelar`
    })
    const {id} = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Borrar tarea',
        choices
    }])
    return id;
}

const menuChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${(i+1).toString().green}. ${tarea.descripcion}`,
            checked: tarea.completadaEn? true : false
        }
    })
   
    const {ids} = await inquirer.prompt([{
        type: 'checkbox',
        name: 'ids',
        message: 'Completar tareas',
        choices
    }])
    return ids;
}

const confirmar = async(message) => {
    const {ok} = await inquirer.prompt([{
        type: 'confirm',
        name: 'ok',
        message,
    }])
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    input,
    menuBorrar,
    confirmar,
    menuChecklist
}