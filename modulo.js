const fs = require('fs')
const Servicio = require('./modelo/servicio');
const Clima = require('./modelo/clima');
const Reserva = require('./modelo/reserva');


exports.obtenerReservas=(servicio)=> {
    try {
        const data = fs.readFileSync('listaReservas.json', 'utf8');
        let json =  JSON.parse(data);
        let listaReservas = []
        json.forEach(element => {
            let nuevaReserva = new Reserva(element.nombre, element.fechaInicio, new Clima(element.clima.temperatura, element.clima.humedad))
            listaReservas.push(nuevaReserva)

        });
        servicio.listaReservas = listaReservas
      } catch (err) {
        console.error(err);
    }
}



exports.addReserva = (servicio,reserva)=> {
    servicio.addReserva(reserva)
    fs.writeFileSync('listaReservas.json', JSON.stringify(servicio.listaReservas))
    
}
