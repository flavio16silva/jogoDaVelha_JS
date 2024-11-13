// ------- Dados Iniciais -----------
//Criando um objeto com cada casa do jogo
//tabuleiro
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '' 
}

let player = ''       //vez
let warning = ''      //mensagem de vencedor
let playing = false   //Identifica se estão jogando ou não após vitoria - Jogador

reset()
// --------- Eventos -------------
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => { //Percorrendo o objeto
    item.addEventListener('click', itemClick)
})


// ---------- Funções ------------
function itemClick(event){
    let item = event.target.getAttribute('data-item') //Pegando o atributo do elemento
    if(playing && square[item] === ''){
        square[item] = player    //'x' ou 'o'
        renderSquare()
        togglePlayer()
    }
}

function reset() {
    warning = '' //limpar a mensagem

    let random = Math.floor(Math.random() * 2)    //arredondamento para baixo
    player = (random === 0) ? 'x' : 'o'           //escolha do jogador aleatoriamente 

    for(let i in square){                         //limpando o tabuleiro
        square[i] = ''
    }

    playing = true //reseta e inicia o jogo

    renderSquare() //redenriza os dados na tela
    renderInfo()   //redenriza as informações na tela 
}

//Varrer o tabuleiro vendo se existe algo preenchido, se existe mostrar no HTML
function renderSquare(){
    for(let i in square){
      let item = document.querySelector(`div[data-item=${i}]`) //pegando cada casa do tabuleiro 
      item.innerHTML = square[i]                            //se vazio põe vazio, senão preenche

    }

    checkGame()
}

//Irá pegar as variaveis - vez e mensagem - e mandar na tela
function renderInfo(){
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning 
}

//Irá alternar entre os valores de X e O
function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x'
    renderInfo()
}

//Verificação de que ganhou o jogo
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu'
        playing = false               //para o jogo
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu'
        playing = false
    } else if(isFull()){
        warning = 'Empate'
        playing = false
    }
}

//Função para verificar o vencedor
function checkWinnerFor(player){
    let pos = [                         //possibilidade de vitoria visto no array
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2', 
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3'
    ]
    
    for(let w in pos){                  //percorrer o array
        let pArray = pos[w].split(',')  //a1, a2, a3
        //verificando se a posiçao do player tá preenchida
        let hasWon = pArray.every(option => square[option] === player) //FORMA RESUMIDA
        if(hasWon){
          return true
        }
    }   

        return false         
}


//Função para verificar se houve empate
function isFull(){
    for(let i in square){
        if(square[i] === ''){ //verificando se existe algum vazio
            return false
        }
    }
    return true
}