const fs = require('fs')
const yargs = require("yargs");
const modulo = require('./modulo.js');
const Servicio = require('./modelo/servicio')
const Clima = require('./modelo/clima');
const Reserva = require('./modelo/reserva')
const axios = require('axios')
let service = new Servicio()


modulo.obtenerReservas(service)

yargs.command({
    command: "addReserva",
    describe: "Añade una reserva a la lista de reservas",

    builder:{
        nombre:{
            describe:'Este es el nombre que tendrá la reserva',
            demandOption: 'true',
            default:'nombreDefault',
            type:'string'
        },
        fechaInicio:{
            describe:'Fecha de inicio de la reserva formato YYYY-MM-DD',
            demandOption: 'true',
            default:`${new Date()}`,
            type:'string'
        }
    },

    handler: (argv) =>{
        let fecha = argv.fechaInicio
        let nombre = argv.nombre
        try {
            let key = fs.readFileSync('APIKey.txt', 'utf8');
            console.log(key);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=36.6864500&lon=-6.1360600&appid=${key}&units=metric`
            console.log(url)
            
            let temperatura = 0
            let humedad = 0
            axios.get(url).then((res)=>{
                temperatura = res.data.main.temp
                humedad = res.data.main.humidity
                let clima = new Clima(temperatura, humedad)
                let reserva = new Reserva(nombre,fecha,clima)
                console.log(reserva)
                modulo.addReserva(service,reserva)
            
            }).catch((err)=>{
                console.log(err)
            })
    
        } catch (err) {
            console.error("No se encontró la key");
        }
        

    }
})

yargs.command({
    command: 'listaReserva',
    describe:'Muestra todas las reservas',

    handler:()=>{
        console.log("Se van a mostrar todas las reservar")
        modulo.obtenerReservas(service)
        console.log(service.listaReservas)
    }
})

yargs.parse()




