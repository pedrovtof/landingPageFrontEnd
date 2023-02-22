
//conexão
let url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'

function conectProduct() {
    fetch(url)
        .then(response => {
            response.json().then(data => {
                addProduct(data)
                url = `https://${data.nextPage}`; // 
            })
        })
        .catch(error => console.error(error));
}
conectProduct()

const htmlInsert = document.querySelector('.products-list') //cria lista para inserir produto

function addProduct(data){ // se conexao der certo
    const APIResponse = data.products // retira valores

    for(let i = 0 ;i < APIResponse.length; i ++){ // insere texto baseado no tanto de produtos
        htmlInsert.innerHTML = htmlInsert.innerHTML + `<div class="product-item">
        <img id="image" src="${APIResponse[i].image}" alt="item from supplier">
                    <h4 class="name-product">${APIResponse[i].name}</h4>
                    <p class="description-product">${APIResponse[i].description}</p>
                    <p class="value-product">De: R$${APIResponse[i].oldPrice}</p>
                    <p class="Value-descont">Por: R$${APIResponse[i].price}</p>
                    <p class="value-product-part">ou 2x de R$${Math.round((APIResponse[i].price)/2)}</p>
                    <br>
                    <button class="buy-product">Comprar</button>
        </div>`
    }

    return  

}


const loadProduct = document.querySelector('.more-product')
loadProduct.addEventListener("click", (e) => {
    e.preventDefault();
   conectProduct()
})


//formularios

let formulario_1 = document.querySelector('#subscribe')
let formulario_2 = document.querySelector('#news-subscribe')

formulario_1.onsubmit = function(evento){
    evento.preventDefault()// cancela comportamento padrao


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
        inputName.style.border = '2px solid green';
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
        inputMail.style.border = '2px solid green';
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
        inputDoc.style.border = '2px solid green';
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
        inputName2.style.border = '2px solid green';
    }

    if(!inputMail2.value){
        inputMail2.classList.remove('email-share')
        inputMail2.classList.add('inputError2')
        console.log('tatata3')
    }else {
        inputMail2.style.border = '2px solid green';
        return
    }

}
