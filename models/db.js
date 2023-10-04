const fs = require('fs')
const archivo = './db/data.json'

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data, null, 3));
}

const leerDB = () => {
    if(fs.existsSync(archivo)){
        const data = fs.readFileSync(archivo, {encoding: 'utf8'});
        return JSON.parse(data);
    }
    return [];
}

module.exports = {
    guardarDB,
    leerDB
}
