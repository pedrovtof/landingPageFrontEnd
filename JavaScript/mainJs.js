
//conexão
let pageAPI = 1
let page = document.body

page.onload = () =>
    begin() //inicia a procura
        .then(connected) //se conectado
        .catch(errorConnection) // se nao conectado

function begin(){
    return new Promise((resolve, reject) => { // protocolo padrao para conexão
        
        const xhttp = new XMLHttpRequest() // protocolo padrao para conexão

        xhttp.onreadystatechange = function(){ // protocolo padrao para conexão
            if (this.readyState == 4 && this.status == 200){  // protocolo padrao para conexão (valida)
                const response = JSON.parse(this.responseText) // protocolo padrao para JSON

                resolve(response) // protocolo padrao para resultado conexão

            }

            if(this.status === 404){ // protocolo padrao para conexão (invalida)
                reject() // protocolo padrao para conexão
            }
        }

        xhttp.open('GET',`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${pageAPI}`) // Link e metodo

        xhttp.send() // protocolo padrao para conexão

    })
}

function errorConnection(){ //caso conexao falhe
    return console.log('error') 
}

const htmlInsert = document.querySelector('.products-list') //cria lista para inserir produto

function connected(response){ // se conexao der certo
    const APIResponse = response.products // retira valores

    for(let i = 0 ;i < APIResponse.length; i ++){ // insere texto baseado no tanto de produtos
        htmlInsert.innerHTML = htmlInsert.innerHTML + `<div class="product-item">
        <img id="image" src="${APIResponse[i].image}" alt="item from supplier">
                    <h4 class="name-product">${APIResponse[i].name}</h4>
                    <p class="description-product">${APIResponse[i].description}</p>
                    <p class="value-product">De: ${APIResponse[i].oldPrice}</p>
                    <p class="Value-descont">Por: ${APIResponse[i].price}</p>
                    <p class="value-product-part">ou 2x de ${(APIResponse[i].price)/2}</p>
                    <button class="buy-product">Comprar</button>
        </div>`
    }

    return  

}


const btnNextPage = document.querySelector('.more-product')
btnNextPage.addEventListener("click", (e) => {
    e.preventDefault();
   pageAPI += 1
   begin()
   console.log(pageAPI)
   console.log(e)

})


//formularios

let formulario_1 = document.querySelector('#subscribe')
let formulario_2 = document.querySelector('#news-subscribe')

formulario_1.onsubmit = function(evento){
    evento.preventDefault()// cancela comportamento padrao

    testes = ``;

    let inputName = document.forms['subscribe']['nome'] // seleciona o campo
    let inputMail = document.forms['subscribe']['email']
    let inputDoc = document.forms['subscribe']['cpf']
    let inputSex = document.forms['subscribe']['sex']

    //Nome
    if(!inputName.value || inputName.value.length < 3){ // verifica se nao existe ou é menor que 3 char
        inputName.classList.add('inputError') // muda classe
        let span = inputName.nextSibling.nextSibling // pesquisa span
        span.innerText = 'Insira o Nome corretamente' // Insere texto no span
        span.classList.add('span-add-form-error') // add clase no span
    } else { //se existe
        inputName.classList.remove('inputError') // remove classe se existir
        let span = inputName.nextSibling.nextSibling // pesquisa span
        span.innerText = '' // apaga texto no span
        span.classList.remove('span-add-form-error') // remove classe do span
        return
    }

    //EMAIL
    if (!inputMail.value){
        inputMail.classList.add('inputError')
        let span = inputMail.nextSibling.nextSibling
        span.innerText = 'Insira o Email corretamente'
        span.classList.add('span-add-form-error')
    }else {
        inputMail.classList.remove('inputError')
        let span = inputMail.nextSibling.nextSibling
        span.innerText = ''
        span.classList.remove('span-add-form-error')
        return
    }

    //CPF
    if (!inputDoc.value || inputDoc.value.length < 10){
        inputDoc.classList.add('inputError')
        let span = inputDoc.nextSibling.nextSibling
        span.innerText = 'Insira o CPF corretamente'
        span.classList.add('span-add-form-error')
    }else {
        inputDoc.classList.remove('inputError')
        let span = inputDoc.nextSibling.nextSibling
        span.innerText = ''
        span.classList.remove('span-add-form-error')
        return
    }


}


formulario_2.onsubmit = function(evento){
    evento.preventDefault()

    let inputName2 = document.forms['news-subscribe']['name-friend'] 
    let inputMail2 = document.forms['news-subscribe']['email-share']
    
    if(!inputName2.value || inputName2.value.length < 3){
        inputName2.classList.remove('name-friend')
        inputName2.classList.add('inputError2')
    }else {
        inputName2.classList.remove('inputError2')
        inputName2.classList.add('name-friend')
        return
    }

    if(!inputMail2.value){
        inputMail2.classList.remove('email-share')
        inputMail2.classList.add('inputError2')
    }else {
        inputMail2.classList.remove('inputError2')
        inputMail2.classList.add('email-share')
        return
    }

}