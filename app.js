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
                    let movRetiro = 'Has retirado: $' + retiro;
                    MOVIMIENTOS_CUENTA.push(movRetiro)
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
let dineroUser = parseInt(prompt('Por favor, sea generoso e ingrese la cantidad de dinero en su cuenta bancaria.'));
let claveUser = parseInt(prompt('Cree su clave bancaria de 3 digitos.'));
const Usuario1 = new CuentaBanco(nombreUser, {Pesos: dineroUser, Dolares: 0, Euros: 0, Reales: 0}, claveUser)

const MONEDAS_EXTRANJERAS = [[{Divisa: "Dolar Venta", Precio: "130,25"},{Divisa: "Dolar Compra", Precio: "124.25"}], [{Divisa: "Euro Venta", Precio: "135,00"}, {Divisa: "Euro Compra", Precio: "128.00"}], [{Divisa: "Real Venta", Precio: "25,80"}, {Divisa: "Real compra", Precio: "21.80"}]]

let impuestoSolidario = 0.30;
let impuesto = 0.35;
const MONEDA_IMPUESTO = MONEDAS_EXTRANJERAS.map(moneda =>{
    if(moneda[0].Divisa == 'Real Venta' ) moneda.Precio   
    return{
        ...moneda.Precio,
        moneda : parseFloat(moneda[0].Precio) + (parseFloat(moneda[0].Precio) * (impuesto + impuestoSolidario))
    }
})

const MOVIMIENTOS_CUENTA = [];

const cajeroAutomatico = (retiro) => { 
    if (Usuario1.nombre) {
        alert('BIENVENIDO ' + Usuario1.nombre + ' AL CAJERO AUTOMATICO');
        let opciones = prompt('Ingrese su opcion: \n 1. Consulta \n 2. Deposito \n 3. Retiro  \n 4. Prestamos \n 5. Comprar Moneda Extranjera \n 6. Movimientos \n 7. Salir');
        switch (opciones) {
            case '1':
                alert(`Su saldo actual en pesos es: $ ${Usuario1.dinero.Pesos}.`);
                alert(`Su saldo actual en dolares es: USD$ ${Usuario1.dinero.Dolares}.`);
                alert(`Su saldo actual en euros es: € ${Usuario1.dinero.Euros}.`);
                alert(`Su saldo actual en real es: R$ ${Usuario1.dinero.Reales}.`);
                consultar();
                break;
                case '2':
                    let deposito = parseInt(prompt('Ingrese el monto a depositar'));
                    Usuario1.dinero.Pesos += deposito;
                alert('Su saldo actual es: $' + Usuario1.dinero.Pesos);
                let movDepo = 'Has depositado: $' + deposito;
                    MOVIMIENTOS_CUENTA.push(movDepo)
                consultar();
                break;
            case '3':
                retirar(retiro);
                break;
            case '4':
                let prestamo = parseInt(prompt('Ingrese el monto a solicitar'));
                let cuotas = parseInt(prompt('Ingrese el numero de cuotas desea devolver el prestamo'));
                intereses(prestamo, cuotas);
                alert(`Lo que debera pagar es: ${cuotas} cuotas de $${calculo} con un total de $${totalPrest}`);
                let aprobarPrestamo = confirm('Desea confirmar el prestamo?');
                if (aprobarPrestamo == true) {
                    Usuario1.dinero.Pesos += prestamo;
                    alert('Su saldo actual es: $' + Usuario1.dinero.Pesos);
                    let movPres = 'Has solicitado un prestamo de: $' + prestamo;
                        MOVIMIENTOS_CUENTA.push(movPres)
                } else {
                    alert('El prestamo ha sido cancelado');
                }
                consultar();
                break;
            case '5':
                let divisasComprar = prompt('Seleccione la moneda que quiere comprar: \n 1. Dolar \n 2. Euro \n 3. Real')
                if(divisasComprar == 1){
                    let dolares = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = dolares * MONEDA_IMPUESTO[0].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        alert('No tienes saldo suficiente para realizar la compra.')
                        consultar();    
                        break;
                    }else{
                        alert(`Has comprado USD$${monto}.`);
                        Usuario1.dinero.Dolares += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[0].moneda * dolares;
                        let movDivisa = `Has comprado USD$${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 2){
                    let euros = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = euros * MONEDA_IMPUESTO[1].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        alert('No tienes saldo suficiente para realizar la compra.')
                        consultar();
                        break;
                    }else{
                        alert(`Has comprado €${monto}.`);
                        Usuario1.dinero.Euros += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[1].moneda * euros;
                        let movDivisa = `Has comprado €${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 3){
                    let reales = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = reales * MONEDA_IMPUESTO[2].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        alert('No tienes saldo suficiente para realizar la compra.')
                        consultar();
                        break;
                    }else{
                        alert(`Has comprado R$${monto}.`);
                        Usuario1.dinero.Reales += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[2].moneda * reales;
                        let movDivisa = `Has comprado R$${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }else{
                    alert('Opcion no disponible')
                }
                consultar();
                break;
            case '6':
                alert('Cargando los movimientos de tu cuenta...');
                for(movimientos in MOVIMIENTOS_CUENTA){
                    alert(MOVIMIENTOS_CUENTA[movimientos]);
                }
                consultar();
                break;
            case '7':
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