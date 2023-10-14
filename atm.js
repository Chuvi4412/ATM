const cuentaDeAhorro = document.getElementById('cuenta-de-ahorro')
const cuentaDeCheques = document.getElementById('cuenta-de-cheques')
const cuentaPrincipal = document.getElementById('cuenta-principal')
const loginContainer = document.querySelector('.login-container')
const body = document.querySelector('body')


const loginPassword = `
<div class="login-password container">
<p class="white-heading">Ingresa tu contraseña</p>
<form id="login-form">
    <input type="password" name="password" id="password">
    <button class="button">Siguiente</button>    
</form>
</div>`

const movements = `
<div class="opciones-movimientos">
    <p class="white-heading">Por favor seleccione una opción</p>
    <div class="login-cards">
        <div class="account-cards" id="consultar-saldo">
            <a>Consultar saldo</a>
        </div>
        <div class="account-cards" id="ingresar-monto">
            <a>Monto a ingresar</a>
        </div>
        <div class="account-cards" id="retirar-monto">
            <a>Monto a retirar</a>
        </div>
    </div>
    </div>`

const getBalanceContainer = (amount, operation, operationAmount) => {
    return `
    <div class="balance-container">
    <p class="white-heading">Tu saldo disponible es</p>
    ${
        operation ? 
        `<div class="balance-sumary">
        <p>Cantidad ${operation === 'deposit' ? 'depositada' : 'retirada'}</p>
        <p>$${operationAmount}</p>
        </div>`
        : 
        ''
    }
    <div class="balance-sumary">
    <p>Tu saldo actual es</p>
    <p>$${amount}</p>
    </div>
    <div class="balance-options">
    <button class="button" id="go-home">Regresar a inicio</button>
    </div>
    </div>`}

const operationContainer = (operation) => {

    return `<div class="deposit-container">
    <p class="white-heading">Ingresa la cantidad a ${operation === 'deposit' ? 'depositar' : 'retirar' }</p>
    <form id="deposit-form">
    <input type="number" id="amount" name="amount">
    <button class="button" id='next'>Siguiente</button>
    </form>
    </div>`}

const validatePassword = (realpassword, userpassword) => {
    if (userpassword === '') return
    if (userpassword !== realpassword) return
    return true
}

const validateAmount = (operation, newAmount, currentAmount) => {
    if (operation === 'deposit') {
        const addQuantities = currentAmount + newAmount
        if (addQuantities > 990) {
            alert('la cantidad rebasa el máximo permitido')
            return
        } else {
            return addQuantities
        }
    }

    const addQuantities = currentAmount - newAmount
    if (addQuantities < 10) {
        alert('la cantidad rebasa el máximo permitido')
        return
    } else {
        return addQuantities
    }

}

const login = (account) => {
    loginContainer.remove()
    body.insertAdjacentHTML('beforeend', loginPassword)
    const loginForm = document.getElementById('login-form')
    const inputPassword = document.getElementById('password')
    const passwordContainer = document.querySelector('.login-password')
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target))
        const isValid = validatePassword(account.contraseña, data.password)
        if (data.password === '') {
            alert('debes intoducir una contraseña')
        }
        if (isValid) {
            passwordContainer.remove()

            body.insertAdjacentHTML('beforeend', movements)
            const getBalanceButton = document.getElementById('consultar-saldo')
            const depositButton = document.getElementById('ingresar-monto')
            const withdrawButton = document.getElementById('retirar-monto')
            const movementsContainer = document.querySelector('.opciones-movimientos')

            getBalanceButton.addEventListener('click', () => {
                movementsContainer.remove()
                body.insertAdjacentHTML('beforeend', getBalanceContainer(account.saldo))
                const goHomeButton = document.getElementById('go-home')
                goHomeButton.addEventListener('click', () => {
                    location.reload();
                })


            })

            depositButton.addEventListener('click', () => {
                movementsContainer.remove()
                body.insertAdjacentHTML('beforeend', operationContainer('deposit'))
                const depositForm = document.getElementById('deposit-form')
                depositForm.addEventListener('submit', (event) => {
                    event.preventDefault()
                    const data = Object.fromEntries(new FormData(event.target))
                    const newAmount = validateAmount('deposit', Number(data.amount), account.saldo)
                    console.log(newAmount)
                    if (newAmount) {
                        const searchDepositContainer = document.querySelector('.deposit-container')
                        searchDepositContainer.remove()
                        body.insertAdjacentHTML('beforeend', getBalanceContainer(newAmount,'deposit', data.amount))

                    }
                })
            })

            withdrawButton.addEventListener('click', () => {
                movementsContainer.remove()
                body.insertAdjacentHTML('beforeend', operationContainer('withdrawal'))
                const depositForm = document.getElementById('deposit-form')
                depositForm.addEventListener('submit', (event) => {
                    event.preventDefault()
                    const data = Object.fromEntries(new FormData(event.target))
                    const newAmount = validateAmount('withdrawal', Number(data.amount), account.saldo)
                    console.log(newAmount)
                    if (newAmount) {
                        const searchDepositContainer = document.querySelector('.deposit-container')
                        searchDepositContainer.remove()
                        body.insertAdjacentHTML('beforeend', getBalanceContainer(newAmount, 'withdrawal', data.amount))

                    }
                })

            })


        } else {
            alert('tu contraseña es incorrecta, por favor intentalo de nuevo')
            inputPassword.value = ''
        }
    })
}

cuentaDeAhorro.addEventListener('click', () => {
    login({ nombre: 'Juan Pablo', saldo: 800, contraseña: 'juanpablo' })
})

cuentaDeCheques.addEventListener('click', () => {
    login({ nombre: 'Valeria', saldo: 500, contraseña: 'valeria' })
})

cuentaPrincipal.addEventListener('click', () => {
    login({ nombre: 'Jasibe', saldo: 100, contraseña: 'jasibe' })
})





