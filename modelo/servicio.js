module.exports = class Servicio{
    constructor() {
        this.listaReservas = []
        
    }

    addReserva(reserva){
        this.listaReservas.push(reserva)
    }

    devolverReservas(){
        return this.listaReservas
    }
}