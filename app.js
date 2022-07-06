const btnAtras = document.querySelector('.btnAtras');

btnAtras.addEventListener('click', () =>{
    cajeroAutomatico();
})

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
                if(retiro <= Usuario1.dinero.Pesos){
                    Usuario1.dinero.Pesos -= retiro;
                    contenedor.innerHTML = `
                        <h2 class="consultasHead">Monto Retirado</h2>
                        <div class="dineroConsulta">
                            <div class="dinero montoDepo">
                            <h3>Retirado:</h3>
                                <span>$${retiro}<span>
                            </div>
                            <div class="dinero">
                                <h3>Pesos:</h3>
                                <span>$${Usuario1.dinero.Pesos}<span>
                            </div>
                        </div>`
                    // alert('Has retirado: $' + retiro);
                    let movRetiro = 'Has retirado: $' + retiro;
                    MOVIMIENTOS_CUENTA.push(movRetiro)
                    // alert('Su saldo actual es: $' + Usuario1.dinero.Pesos);
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
// let nombreUser = prompt('Ingrese su Nombre de Usuario');
/*nombreUser = nombreUser.toUpperCase();
let dineroUser = parseInt(prompt('Por favor, ingrese su dinero de su cuenta bancaria.'));
let claveUser = parseInt(prompt('Cree su clave bancaria de 3 digitos.')); */
const Usuario1 = new CuentaBanco("emi", {Pesos: 1000, Dolares: 100, Euros: 500, Reales: 460}, 123)

const MONEDAS_EXTRANJERAS = [[{Divisa: "Dolar Venta", Precio: "130,25"},{Divisa: "Dolar Compra", Precio: "124.25"}], [{Divisa: "Euro Venta", Precio: "135,00"}, {Divisa: "Euro Compra", Precio: "128.00"}], [{Divisa: "Real Venta", Precio: "25,80"}, {Divisa: "Real compra", Precio: "21.80"}]]

console.log(MONEDAS_EXTRANJERAS[0][0].Divisa);

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

let contenedor = document.querySelector('.contenedor');
const bienvenida = document.querySelector('.bienvenida');
bienvenida.innerHTML = `¡Bienvenido ${Usuario1.nombre}!`

// contenedor = '';


const cajeroAutomatico = (retiro) => { 
    if (Usuario1.nombre) {
        // alert('BIENVENIDO ' + Usuario1.nombre + ' AL CAJERO AUTOMATICO');
        let opciones = prompt('Ingrese su opcion: \n 1. Consulta \n 2. Deposito \n 3. Retiro  \n 4. Prestamos \n 5. Comprar Moneda Extranjera \n 6. Movimientos \n 7. Salir');
        switch (opciones) {
            case '1':
                contenedor.innerHTML =
                `<h2 class="consultasHead">Tu dinero disponible:</h2>
                <div class="dineroConsulta">
                    <div class="dinero">
                        <h3>Pesos:</h3>
                        <span>$${Usuario1.dinero.Pesos}<span>
                    </div>
                    <div class="dinero">
                        <h3>Dolar:</h3>
                        <span>USD$${Usuario1.dinero.Dolares}<span>
                    </div>
                    <div class="dinero">
                        <h3>Euros:</h3>
                        <span>€${Usuario1.dinero.Euros}<span>
                    </div>
                    <div class="dinero">
                        <h3>Real:</h3>
                        <span>R$${Usuario1.dinero.Reales}<span>
                    </div>
                </div>
                `
                // consultar();
                break;
                case '2':
                    let deposito = parseInt(prompt('Ingrese el monto a depositar en pesos'));
                    Usuario1.dinero.Pesos += deposito;
                    contenedor.innerHTML = `
                    <h2 class="consultasHead">Monto Depositado</h2>
                    <div class="dineroConsulta">
                        <div class="dinero montoDepo">
                        <h3>Depositado:</h3>
                            <span>$${deposito}<span>
                        </div>
                        <div class="dinero">
                            <h3>Pesos:</h3>
                            <span>$${Usuario1.dinero.Pesos}<span>
                        </div>
                    </div>`
                let movDepo = 'Has depositado: $' + deposito;
                    MOVIMIENTOS_CUENTA.push(movDepo)
                // consultar();
                break;
            case '3':
                retirar(retiro);
                break;
            case '4':
                let prestamo = parseInt(prompt('Ingrese el monto a solicitar'));
                let cuotas = parseInt(prompt('Ingrese el numero de cuotas desea devolver el prestamo'));
                intereses(prestamo, cuotas);
                // alert(`Lo que debera pagar es: ${cuotas} cuotas de $${calculo} con un total de $${totalPrest}`);
                let aprobarPrestamo = confirm('Desea confirmar el prestamo?');
                if (aprobarPrestamo == true) {
                    Usuario1.dinero.Pesos += prestamo;
                    contenedor.innerHTML = `
                    <h2 class="consultasHead">Prestamo Solcitado</h2>
                    <div class="dineroConsulta">
                        <div class="dinero">
                        <h3>Prestamo:</h3>
                            <span>$${prestamo}<span>
                        </div>
                        <div class="dinero">
                            <h3>Pesos:</h3>
                            <span>$${Usuario1.dinero.Pesos}<span>
                        </div>
                    </div>`
                    // alert('Su saldo actual es: $' + Usuario1.dinero.Pesos);
                    let movPres = 'Has solicitado un prestamo de: $' + prestamo;
                        MOVIMIENTOS_CUENTA.push(movPres)
                } else {
                    
                    contenedor.innerHTML = `
                    <h3>El prestamo ha sido cancelado</h3>
                    `
                }
                consultar();
                break;
            case '5':
                let divisasComprar = prompt('Seleccione la moneda que quiere comprar: \n 1. Dolar \n 2. Euro \n 3. Real')
                if(divisasComprar == 1){
                    let dolares = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = dolares * MONEDA_IMPUESTO[0].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar USD$${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
                        break;
                    }else{
                        alert(`Has comprado USD$${monto}.`);
                        Usuario1.dinero.Dolares += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[0].moneda * dolares;
                        contenedor.innerHTML = `
                        <h2 class="consultasDivisasHead">Precio de Divisas</h2>
                        <div class="precioDivisas">
                            <div class="divisa">
                                <h3>Dolar Venta</h3>
                                <span>$${MONEDAS_EXTRANJERAS[0][0].Precio}<span>
                            </div>
                            <div class="divisa">
                                <h3>Dolar Compra</h3>
                                <span>$${MONEDAS_EXTRANJERAS[0][1].Precio}<span>
                            </div>
                        </div>
                        <h2 class="consultasHead">Compra de Dolares</h2>
                        <div class="dineroConsulta">
                            <div class="dinero montoDepo">
                            <h3>Dolares</h3>
                                <span>USD$${Usuario1.dinero.Euros}<span>
                            </div>
                            <div class="dinero montoDepo">
                                <h3>Pesos:</h3>
                                <span>$${Usuario1.dinero.Pesos}<span>
                            </div>
                        </div>`
                        let movDivisa = `Has comprado USD$${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 2){
                    let euros = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = euros * MONEDA_IMPUESTO[1].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar €${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
                        break;
                    }else{
                        alert(`Has comprado €${monto}.`);
                        Usuario1.dinero.Euros += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[1].moneda * euros;
                        contenedor.innerHTML = `
                        <h2 class="consultasHead">Precio de Divisas</h2>
                        <div class="precioDivisas">
                            <div class="divisa">
                                <h3>Euros Venta</h3>
                                <span>€${MONEDAS_EXTRANJERAS[1][0].Precio}<span>
                            </div>
                            <div class="divisa">
                                <h3>Euros Compra</h3>
                                <span>€e${MONEDAS_EXTRANJERAS[1][1].Precio}<span>
                            </div>
                        </div>
                        <h2 class="consultasHead">Compra de Euros</h2>
                        <div class="dineroConsulta">
                            <div class="dinero montoDepo">
                            <h3>Euros</h3>
                                <span>€${Usuario1.dinero.Euros}<span>
                            </div>
                            <div class="dinero">
                                <h3>Pesos:</h3>
                                <span>$${Usuario1.dinero.Pesos}<span>
                            </div>
                        </div>`
                        let movDivisa = `Has comprado €${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 3){
                    let reales = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = reales * MONEDA_IMPUESTO[2].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar R$${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
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
                break;
            case '6':
                contenedor.innerHTML = '';
                console.log(MOVIMIENTOS_CUENTA);
                alert('Cargando los movimientos de tu cuenta...');
                for(movimientos in MOVIMIENTOS_CUENTA){
                    contenedor.innerHTML += `
                    <h2>${MOVIMIENTOS_CUENTA[movimientos]}</h2>
                    `
                    console.log(MOVIMIENTOS_CUENTA[movimientos]);
                }
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