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

    eliminarReserva(nombre){
        let encontrado = false
        let indice = -1
        for (let i = 0; i< this.listaReservas.length && encontrado==false; i++) {
            let reserva = this.listaReservas[i]
            if (reserva.nombre == nombre) {
                indice=i
                encontrado=true
            }
        }

        this.listaReservas.splice(indice,1)
    }
}