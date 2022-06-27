const consultar = () =>{
    let opcion = confirm('Desea realizar otra acción?');
    if(opcion == true){
        cajeroAutomatico();
    }else{
        alert('Gracias por usar nuestros servicios.');
    }
}

const intereses = (prestamo, cuotas) => {
    for (let i = 1; i <= cuotas; i++) {
        let tasa = 1.5;
        calculo = (prestamo * tasa) / cuotas;
        valorCuota = (calculo + prestamo) / cuotas;
        totalPrest = calculo * cuotas;
        alert(`El valor de la cuota numero ${i} es: $${calculo}`);
        //return calculo = prestamo * 0.02 * cuotas;
    }
}


const retirar = (retiro) =>{
    let intentos = 2;
    for (let i = 2; i <= intentos; i--) {
        if(i < 0){
            alert('Su cuenta a sido bloqueada. Comuniquese con su banco para más información. Gracias, vuelva prontos.');
            break;
        }else{
            let pw = parseInt(prompt('Ingrese su clave'));
            if (pw == Usuario1.clave) {
                retiro = parseInt(prompt('Ingrese el monto a retirar'));
                if(retiro <= Usuario1.dinero){
                    Usuario1.dinero -= retiro;
                    alert('Has retirado: $' + retiro);
                    alert('Su saldo actual es: $' + Usuario1.dinero);
                    consultar();
                    break;
                }else{
                    alert('No tiene saldo suficiente');
                }
                
            }else{
                alert('Su clave es incorrecta. Te quedan: ' + i + ' intentos.');
            } 
        }
    }
}

class CuentaBanco{
    constructor(nombre, dinero, clave){
        this.nombre = nombre;
        this.dinero = dinero;
        this.clave = clave;
    }
}
let nombreUser = prompt('Ingrese su Nombre de Usuario');
nombreUser = nombreUser.toUpperCase();
let dineroUser = parseInt(prompt('Por favor, sea genero e ingrese la cantidad de dinero en su cuenta bancaria.'));
let claveUser = parseInt(prompt('Cree su clave bancaria de 3 digitos.'));
const Usuario1 = new CuentaBanco(nombreUser, dineroUser, claveUser)


console.log(Usuario1);

const MOVIMIENTOS_CUENTA = [];


const cajeroAutomatico = (retiro) => { 
    if (Usuario1.nombre) {
        alert('BIENVENIDO ' + Usuario1.nombre + ' AL CAJERO AUTOMATICO');
        let opciones = prompt('Ingrese su opcion: \n 1. Retiro \n 2. Deposito \n 3. Consulta \n 4. Prestamos \n 5. Salir');
        switch (opciones) {
            case '1':
                retirar(retiro);
                break;
            case '2':
                let deposito = parseInt(prompt('Ingrese el monto a depositar'));
                Usuario1.dinero += deposito;
                alert('Su saldo actual es: $' + Usuario1.dinero);
                consultar();
                break;
            case '3':
                alert('Su saldo actual es: $' + Usuario1.dinero);
                consultar();
                break;
            case '4':
                let prestamo = parseInt(prompt('Ingrese el monto a solicitar'));
                let cuotas = parseInt(prompt('Ingrese el numero de cuotas desea devolver el prestamo'));
                intereses(prestamo, cuotas);
                alert(`Lo que debera pagar es: ${cuotas} cuotas de $${calculo} con un total de $${totalPrest}`);
                let aprobarPrestamo = confirm('Desea confirmar el prestamo?');
                if (aprobarPrestamo == true) {
                    Usuario1.dinero += prestamo;
                    alert('Su saldo actual es: $' + Usuario1.dinero);
                } else {
                    alert('El prestamo ha sido cancelado');
                }
                consultar();
                break;
            case '5':
                alert('Gracias por usar nuestros servicios.')
                break;
            default:
                alert('Opcion no valida');
                cajeroAutomatico();
                break;
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

cajeroAutomatico();