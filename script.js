
//*****************************************************


// SCRIPT LAYOUT 1 ************************************
function deuruim(error) {
    console.log("deu ruim!")
    console.log(error);
}

function iniciaTela() {
    window.scrollTo(0,0);
    document.querySelector(".cria-quiz").innerHTML ="";

    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promessa.then(comecaQuizz);
    promessa.catch(deuruim);
}

iniciaTela(); 


function comecaQuizz(resposta) {
    
    console.log(resposta);
    const url = resposta.data[0].image;

    const printaTela = document.querySelector(".tela1");
    printaTela.classList.remove('display-none');
    printaTela.innerHTML ="";

    printaTela.innerHTML +=
        `
            <div class="container display-flex-center">
                <div class="conteudo-pagina display-flex-center">

                    <div class="seus-quizzes-vazio display-none">
                        <h1>Você não criou nenhum quizz ainda :(</h1>
                        <div class="botao display-flex-center" onclick = "setTelaUmCriaQuiz()" data-identifier="create-quizz">Criar Quizz</div>
                    </div>
                    <div class="seus-quizzes-conteudo display-none" data-identifier="user-quizzes">
                        <div class=" subtitulo display-flex-center">Seus Quizzes <img class ="button_mais" src="./img/botaoadd.png" onclick = "setTelaUmCriaQuiz();" data-identifier="create-quizz"></div>
                       
                    </div>

                    <div class="todos-os-quizzes display-flex-center" data-identifier="general-quizzes">
                        <div class="subtitulo">Todos os Quizzes</div>

                    </div>

                </div>
            </div>
        `
    const puxaQuizz = document.querySelector(".todos-os-quizzes");
    for (let i = 0; i < resposta.data.length; i++) {
        puxaQuizz.innerHTML += `<div class="quizz" data-identifier="quizz-card" onclick="openScreen2(${resposta.data[i].id})"><div class ="image"></div><img src="${resposta.data[i].image}">
                                <a class="titulo-quizz">${resposta.data[i].title}</a></div>`
    }


    
    console.log("*********************");
    //console.log(promessa.data);

    //coloca meus quizzes
    //let tam_lista_quizzes = localStorage.getItem(nome_quizLocalStorage);
    
    if(localStorage.getItem(nome_quizLocalStorage)){
        let array_ids_quizzes = splitStringLocalStorage();
        let tam_lista_quizzes = array_ids_quizzes.length;
    
        //console.log("tam da lista" + tam_lista_quizzes);
        //console.log(array_ids_quizzes);
        
        for (let i = 0; i < tam_lista_quizzes; i++) {
            let idl = parseInt(array_ids_quizzes[i]);
            console.log(idl);
            let promessa_meus_ids = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idl}`);
            promessa_meus_ids.then(colocaMeuQuiz);
            const retiraQuizz = document.querySelector(".seus-quizzes-conteudo");
            retiraQuizz.classList.remove("display-none");
            retiraQuizz.classList.add("display-flex"); 

        }
    }else{
        const quizzVazio =document.querySelector(".seus-quizzes-vazio");
        quizzVazio.classList.remove("display-none");
        quizzVazio.classList.add("display-flex-center");
        


    }

}

function colocaMeuQuiz(resposta){
        const puxaMeuQuizz = document.querySelector(".seus-quizzes-conteudo");

        console.log(resposta);
        //console.log(resposta.data[idl].image);
        puxaMeuQuizz.innerHTML += `<div class="quizz" data-identifier="quizz-card" onclick="openScreen2(${resposta.data.id})"><div class ="image"></div><img src="${resposta.data.image}">
        <a class="titulo-quizz">${resposta.data.title}</a></div>`
}

//*****************************************************
// SCRIPT LAYOUT 2 ************************************

function comparador() { 
	return Math.random() - 0.5; 
}

let numberOfQuestions = 0;
let numberOfCorrectAnswers = 0;
let score = 0;
let numberOfQuestionsAnswered = 0;
let varResponse;
let nextQuestion;


//pega o quizz do servidor e chama a openQuizz


function openScreen2(quizzNumber) {

    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("display-none");
    const tela2 = document.querySelector(".tela2");
    tela2.classList.remove("display-none");

    const getSpecificQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzNumber}`);
    getSpecificQuizz.then(openQuizz);
}

//coloca na tela o quizz respectivo ao clicado

function openQuizz(response) {
    window.scrollTo(0,0);
    varResponse = response.data;
    const showQuizz= document.querySelector(".quizzContent");
    showQuizz.innerHTML += `<div class="capa-quizz">
    <img src="${response.data.image}">
    </div>
    <a class="chamada-quizz">
    <p>${response.data.title}</p>
    </a>
    <div class="capa-preta">
            
    </div>
    <div class="perguntasQuizz"></div>
</div>`

    let questionsQuizzDiv = document.querySelector(".perguntasQuizz");
    for(let i = 0; i < response.data.questions.length; i++){
        numberOfQuestions = response.data.questions.length;
        questionsQuizzDiv.innerHTML += `<div class="pergunta unanswered">
    <div class="questionamento display-flex-center" data-identifier="question"><a>${response.data.questions[i].title}</a></div>
    <div class="imagens"></div></div>`
        let arrayDivAnswers = document.querySelectorAll(`.imagens`);
        
        answersSort = response.data.questions[i].answers.sort(comparador); 
        for(let j = 0; j < response.data.questions[i].answers.length; j++){
               

            arrayDivAnswers[i].innerHTML += `<div class="resposta" data-identifier="answer" onclick="selectAnswer(this)">
            <img src="${response.data.questions[i].answers[j].image}">
            <div class="alternativa">${response.data.questions[i].answers[j].text}</div>
        </div>`

            let arrayAnswers = document.querySelectorAll(".resposta");
            //console.log(arrayAnswers)
            if (response.data.questions[i].answers[j].isCorrectAnswer === true) {
                arrayAnswers[j + i * 4].classList.add('correctAnswer');
            } else {
                arrayAnswers[j + i * 4].classList.add('wrongAnswer');
            }
        }

        let divQuestion = questionsQuizzDiv.children[i];
        let divColor = divQuestion.children[0]
        divColor.style.backgroundColor = `${response.data.questions[i].color}`
    }


    //se a tela 3.4 tiver com o elemento ela tira
    document.querySelector(".cria-quiz").innerHTML = "";
}
//openScreen2();           

//muda a aparência de acordo com a resposta

function selectAnswer(answerPicked){
    numberOfQuestionsAnswered = numberOfQuestionsAnswered + 1;
    const divAnswersParent = answerPicked.parentElement;
    //nao deixa responder de novo
    if(divAnswersParent.classList.contains("alreadyAnswered")=== false){
    answerPicked.parentElement.parentElement.classList.remove("unanswered");
    answerPicked.parentElement.classList.add("alreadyAnswered");
    answerPicked.classList.add("selected");
    
    if(answerPicked.classList.contains("correctAnswer")){
        answerPicked.classList.add("certa");
        numberOfCorrectAnswers = numberOfCorrectAnswers + 1;
    } else{
        answerPicked.classList.add("errada");
    }

    for (let i = 0; i < divAnswersParent.childElementCount; i++) {
        if (divAnswersParent.children[i].classList.contains("selected") === false && divAnswersParent.children[i].classList.contains("correctAnswer") === true) {
            divAnswersParent.children[i].classList.add("opacidade");
            divAnswersParent.children[i].classList.add("certa");
        } if (divAnswersParent.children[i].classList.contains("selected") === false && divAnswersParent.children[i].classList.contains("correctAnswer") === false) {
            divAnswersParent.children[i].classList.add("opacidade");
            divAnswersParent.children[i].classList.add("errada");
        }
        }
    }
    score = Math.round((numberOfCorrectAnswers/numberOfQuestions)*100);
    

    if (numberOfQuestionsAnswered === numberOfQuestions){
        setTimeout(openResult,2000);
    } else {
        nextQuestion = document.querySelector(".pergunta.unanswered")
        setTimeout(scrollToNext,2000);
    }
    console.log(score)
}

//scroll para a próxima pergunta
function scrollToNext(){
    
    console.log(nextQuestion)
    nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


//resultado com base nos níveis
function openResult(){
    console.log("caboquiz")
    const resultScreen = document.querySelector(".result");
    
    resultScreen.classList.remove('display-none');
    console.log(varResponse.levels);
    //organizar por ordem crescente

    varResponse.levels.sort(function(a, b) {
        return parseFloat(a.minValue) - parseFloat(b.minValue);
    });
    console.log(varResponse.levels)

    for(i=0; i<varResponse.levels.length;i++){
        if(score >= varResponse.levels[i].minValue){
            resultScreen.innerHTML = `
            <div class="resultTitle">
                <p>${score}% de acerto: ${varResponse.levels[i].title}</p>
            </div>
            <div class="boxResult">
                <img src="${varResponse.levels[i].image}" alt=""/>
                <p>${varResponse.levels[i].text}</p>
            </div>  
            `
        }
    }
    resultScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const buttons = document.querySelector(".buttons");

    buttons.innerHTML += `<button class="resetQuizz" onclick="resetQuizz()">Reiniciar Quizz</button>
    <p class="returnHome" onclick="returnHome()">Voltar pra home</p> `
    
}

//reseta o Quizz
function resetQuizz(){

    //reseta os scores
    numberOfCorrectAnswers = 0;
    score = 0;
    numberOfQuestionsAnswered = 0;

    //fecha o resultado e os botões
    const resultScreen = document.querySelector(".result");
    resultScreen.classList.add('display-none');
    //const botao = document.querySelector('.resetQuizz');
    //botao.classList.add('display-none');
    //const botao2 = document.querySelector('.returnHome');
    //botao2.classList.add('display-none');
    const buttons = document.querySelector(".buttons");
    buttons.innerHTML= "";

    //reseta as divs
    const arrayDivsQuestions = document.querySelectorAll(".alreadyAnswered")
    for(j=0; j < arrayDivsQuestions.length; j++){
        arrayDivsQuestions[j].classList.remove("alreadyAnswered");
        arrayDivsQuestions[j].parentElement.classList.add("unanswered");
    }
    //reseta respostas
    const arrayOpacity = document.querySelectorAll(".opacidade");
    for(i=0; i< arrayOpacity.length; i++){
        arrayOpacity[i].classList.remove("opacidade");
    }
    const arrayCorrect = document.querySelectorAll(".certa");
    for(k=0; k< arrayCorrect.length; k++){
        arrayCorrect[k].classList.remove("certa")
    }
    const arrayIncorrect = document.querySelectorAll(".errada");
    for(l=0; l< arrayIncorrect.length; l++){
        arrayIncorrect[l].classList.remove("errada")
    }
    const arraySelected = document.querySelectorAll(".selected");
    for(m=0; m< arraySelected.length; m++){
        arraySelected[m].classList.remove("selected")
    }


    //sobe ate o comeco
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function returnHome(){
    const tela1 = document.querySelector(".tela1");
    tela1.classList.remove("display-none");
    const tela2 = document.querySelector(".tela2");
    tela2.classList.add("display-none");
    iniciaTela();
}
//*****************************************************
// SCRIPT LAYOUT 3 ************************************
const MAX_RESPOSTA = 4;//numero maximo de respostas dentro de uma pergunta
const nome_quizLocalStorage = "quizzes";//nome do meu local storage onde vou armazenas os IDS dos quizzes
let id_quizz_criado;

//variaveis do quiz que vai ser criado_______________________
let objeto_quiz_criado = {};
let array_ids_meus_quizz = [];
//Variáveis obtidas na tela 3.1
let titulo = "";
let url_img_quizz = "";
let n_perguntas = 0;
//Variáveis obtidas na tela 3.2
let array_respostas = [];
let array_perguntas = [];
let array_nivel = [];

//____________________________________________________________
//const array_answers = [];

//General functions**************************

function scroll_to(string) {
    const elementoQueQueroQueApareca = document.querySelector(string);
    elementoQueQueroQueApareca.scrollIntoView();
}


//SCRIPT CRIA QUIZZ*******************************************************************************


//coloca Cria Quiz, tela 1, "começar pelo começo" no HTML
//tela1


//tela 3.1
function setTelaUmCriaQuiz() {

    //zerar layout 1
    document.querySelector(".tela1").innerHTML ="";


    const seletor = document.querySelector(".cria-quiz");
    seletor.innerHTML = `
    
    <p class="title">Comece pelo começo</p>

    <form onSubmit="setTelaDoisCriaQuiz();" >
        <div class="card-inputs-quiz">
            <input placeholder ="Título do seu quizz" type="text" minlength="20" maxlength="65" id="titulo-quizz" required/>
            <input placeholder ="URL da imagem do seu quizz" type="url" name="userURL" id="url-img-quizz" required/>
            <input placeholder ="Quantidade de perguntas do quizz" type="number" name="quantity" min="3" id="n-perguntas-quizz" required/>
            <input placeholder ="Quantidade de níveis do quizz" type="number" name="quantity" min="2" id="n-niveis-quizz" required/>
        </div>  

    <button type="submit" class="btn-primario">Prosseguir para criar perguntas</button>
    </form>
    `
    //automatiza_testes_tela1();
}

//setTelaUmCriaQuiz();//essa funcao chama o Layout 3


//mostra pergunta quando clica no ícone "expand"
function mostrarPergunta(elemento) {
    elemento.classList.toggle("select");
    elemento.parentElement.classList.toggle("minimizado");

    let div_corpodapergunta = elemento.parentElement.children[1];
    div_corpodapergunta.classList.toggle("display-none");
    //console.log(elemento.parentElement.children[1]);
}

function mostrarConteudoNivel(elemento) {
    elemento.classList.toggle("select");
    elemento.parentElement.parentElement.classList.toggle("minimizado");

    let div_corpoDoNivel = elemento.parentElement.children[1];
    div_corpoDoNivel.classList.toggle("display-none");
    //console.log(elemento.parentElement.children[1]);
}


//coloca as perguntas na tela 3.2 dependendo da quantidade de numero de perguntas...
//inseridas na tela 3.1
//APENAS monta no hmtl as perguntas 
function colocaPergunta(i) {

    let select;
    let mostrar_pergunta;
    let minimizado;

    if (i > 0) {
        select = "";
        mostrar_pergunta = "display-none";
        minimizado = "minimizado";
    } else {
        select = "select";
        mostrar_pergunta = "";
        minimizado = "";
    }

    return `
    <div class="card-inputs-quiz ${minimizado}" data-identifier="question-form" id ="pergunta${i}">
        
        <div class="card-edit ${select}" onclick = "mostrarPergunta(this)">
            <p class="title">Pergunta ${i + 1}</p>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
            </div>

        <div class = "corpoDaPergunta ${mostrar_pergunta}">
            <div class="group-inputs">
                    <input placeholder="Texto da pergunta" type="text" minlength="20" id = "tituloDaPergunta${i}"required/>
                    <input placeholder="Cor de fundo da pergunta" type="text" pattern="[#]{1}[0-1-2-3-4-5-6-7-8-9-a-b-c-d-e-f]{6}" maxlength="7" minlength="7" id = "corHexadecimalPergunta${i}" required/>
            </div>

            <!--talvez faça sentido colocar pra esconder dps-->
            <div class="group-inputs">
                <p class="title">Resposta correta</p>
                <input placeholder="Resposta correta" type="text" id = "textoDaResposta0" required/>
                <input placeholder="URL da imagem" type="url" id = "urlImgResposta0" required/>
            </div>

            <div class="group-inputs">
                <p class="title">Respostas incorretas</p>
                <input placeholder="Resposta incorreta 1" type="text" id = "textoDaResposta1" required/>
                <input placeholder="URL da imagem 1" type="url" id = "urlImgResposta1" required/>
            </div>
                
            <div class="group-inputs">
                <input placeholder="Resposta incorreta 2" type="text" id = "textoDaResposta2"> 
                <input placeholder="URL da imagem 2" type="url" id = "urlImgResposta2">
            </div>

            <div class="group-inputs">
                <input placeholder="Resposta incorreta 3" type="text" id = "textoDaResposta3">
                <input placeholder="URL da imagem 3" type="url" id = "urlImgResposta3">
            </div>

        </div>
        <!-- fim de <div class="pergunta-content">-->

        <!--fim do group-inputs-->
    </div>
`;

    console.log("entrou");
}

//tela 3.2
function setTelaDoisCriaQuiz() {
    //pegar dados da tela anterior antes de colocar a segunda tela
    titulo = document.querySelector("#titulo-quizz").value;
    url_img_quizz = document.querySelector("#url-img-quizz").value;
    n_perguntas = parseInt(document.querySelector("#n-perguntas-quizz").value);
    n_niveis = parseInt(document.querySelector("#n-niveis-quizz").value);

    let stringTela2 = "";
    //comeco da tela 2
    stringTela2 = `
        <p class="title">Crie suas perguntas</p>
        <form onSubmit = "setTelaTresCriaQuiz();">   
    `;

    for (let i = 0; i < n_perguntas; i++) {
        //troca corpo
        stringTela2 += `
            ${colocaPergunta(i)}
        `
    }
    //colocando final da pagina
    stringTela2 += `
            <button type="submit" class="btn-primario">Prosseguir para criar níves</button>
            </form>
        `

    document.querySelector(".cria-quiz").innerHTML = stringTela2;

    //preenche inputs tela 2
    //automatiza_testes_tela2();

}



//pega os valores da tela dois e organiza no meu objeto arrayPerguntas
function organizaValoresInseridosTelaDois() {

    for (let i = 0; i < n_perguntas; i++) {
        array_respostas = [];

        let tituloDaPergunta = "";
        let corHexadecimalPergunta = "";

        let objetoPergunta = {
            title: "",
            color: "",
            answers: array_respostas
        }

        //pega todos elementos do form e coloca no meu objeto do quiz criado
        tituloDaPergunta = document.querySelector(`#tituloDaPergunta${i}`).value;

        
        corHexadecimalPergunta = document.querySelector(`#corHexadecimalPergunta${i}`).value;
   

        //setando nas minhas variaveis globais o titulo da pergunta e a corHexadecimal
        objetoPergunta.title = tituloDaPergunta;
        objetoPergunta.color = corHexadecimalPergunta;

        //Montando meus objetos de resposta para cada pergunta, por isso um for
        //pra cada pergunta no maximo tem 3 respostas - 1 correta e duas incorretas
        for (let j = 0; j < MAX_RESPOSTA; j++) {

            let textoDaResposta = "";
            let urlImgResposta = "";
            let ehrespostaCorreta = false; //false or true

            let objetoResposta = {
                text: "",
                image: "",
                isCorrectAnswer: false
            }


            //coloca no objeto reposta texto e imagem da resposta com indice j
            const seletorTextoDaResposta = document.querySelector(`#pergunta${i} #textoDaResposta${j}`);

            if (seletorTextoDaResposta != null) {
                const valorTextoDaResposta = seletorTextoDaResposta.value;
                textoDaResposta = valorTextoDaResposta;

                const seletorUrlImgResposta = document.querySelector(`#pergunta${i} #urlImgResposta${j}`);

                if (seletorUrlImgResposta != null) {
                    const valorUrlImgResposta = seletorUrlImgResposta.value;
                    urlImgResposta = valorUrlImgResposta;
                } else {
                    urlImgResposta = "";
                }

                //seta isCorrectAnswer
                if (j == 0) {
                    ehRespostaCorreta = true;
                } else {
                    ehRespostaCorreta = false;
                }

                //coloca todos elementos anteriores em um objeto_resposta
                objetoResposta.text = textoDaResposta;
                objetoResposta.image = urlImgResposta;
                objetoResposta.isCorrectAnswer = ehRespostaCorreta;

                if (textoDaResposta != "") {
                    objetoPergunta.answers.push(objetoResposta);
                }

            }
            /* 
            console.log("objResposta");
            console.log(objetoResposta) */;

        }
    


        /*    console.log("objpergunta");
           console.log(objetoPergunta); */
        //coloco no meu objeto pergunta no arrayPerguntas[i]
        array_perguntas.push(objetoPergunta);

    }
    //console.log("array com perguntas"); 
    console.log(array_perguntas);
    
}

//tela 3.3

function colocaNiveis() {
    let string_niveis = "";

    let select;
    let mostrarNivel;
    let minimizado;

    for (let i = 0; i < n_niveis; i++) {

        if (i > 0) {
            select = "";
            mostrarNivel = "display-none";
            minimizado = "minimizado";
        } else {
            select = "select";
            mostrarNivel = "";
            minimizado = "";
        }

        string_niveis += `
        <div class="card-inputs-quiz ${minimizado}">
            <div class="group-inputs" data-identifier="level">
                <div class="card-edit ${select}" onclick="mostrarConteudoNivel(this)">
                    <p class="title">Nível ${i+1}</p>
                    <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
                </div>
                
                <div class = "corpoDoNivel ${mostrarNivel}">
                    <input placeholder="Título do nível" type="text" minlength="10" id ="titulo-nivel" required/>
                    <input placeholder="% de acerto mínima" type="number" min="0" max ="100" id ="acerto-min-nivel" required/>
                    <input placeholder="URL da imagem do nível" type="url" id ="url-img-nivel" required/>
                    <textarea placeholder="Descrição do nível" rows="5" minlength="30" type="text" id ="descricao-nivel" required/>
                    </textarea>
                </div>
            </div>
        </div>
        `
    }

    return string_niveis;
}

/*function verificaDadosTelaDois(){

    if(isCorHexadecimal()){
        alert("deubom a cor!")
        setTelaTresCriaQuiz();
    }else{
        
    }
}*/

function isCorHexadecimal(){
    let corHexa;
    let result = true;

    for(let i = 0; i < n_perguntas; i++){
        corHexa = document.querySelector(`#corHexadecimalPergunta${i}`).value;
        if(corHexa[0] != "#" || corHexa[1] == "#" ||corHexa[2] == "#" || corHexa[3] == "#" || corHexa[4] == "#" || corHexa[5] == "#" || corHexa[6] == "#"){
            alert(`a cor hexadecimal inserida na pergunta ${i} não está no formato #F3F3F3`);
            result = false;
        }
    }

    return result;  
}

function setTelaTresCriaQuiz() {

    organizaValoresInseridosTelaDois();

    scroll_to("body");
    
    document.querySelector(".cria-quiz").innerHTML =
        `
    <p class="title">Comece pelo começo</p>

     <form  action ="#"  onSubmit = "setTelaQuatroCriaQuiz(event)">
            ${colocaNiveis()}
            <button class="btn-primario" >Finalizar Quizz</button>
    </form>

    `
    //automatiza_testes_tela3();
}

//organizando dados dos Niveis
function organizaValoresInseridosTelaTres(){
    //formato do meu objeto nivel

    /*{
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
    } */


    const array_titulos_nivel = document.querySelectorAll("#titulo-nivel");
    const array_acerto_min_nivel = document.querySelectorAll("#acerto-min-nivel");
    const array_descricao_nivel = document.querySelectorAll("#descricao-nivel");
    const array_url_img_nivel = document.querySelectorAll("#url-img-nivel");

   for(let i = 0; i < n_niveis; i++){
        let objeto_nivel = {
            title: "",
            image: "",
            text: "",
            minValue: 0
        } 

        objeto_nivel.title = array_titulos_nivel[i].value;
        objeto_nivel.minValue = array_acerto_min_nivel[i].value;
        objeto_nivel.image = array_url_img_nivel[i].value;
        objeto_nivel.text = array_descricao_nivel[i].value;      

        array_nivel.push(objeto_nivel);
   }
}


//setTelaTresCriaQuiz();//essa funcao chama o Layout 

//tela 3.4

function chamaopenScreen2(){
    openScreen2(id_quizz_criado);
}

function quizCriadoComSucesso(){

    
    return `
    <!--tela 3.4 - criado com sucesso -->
    <p class="title">Seu quizz está pronto!</p>
    <div class="quizz-pronto">
        <div class="quizz"><img src="${objeto_quiz_criado.image}"><a class="titulo-quizz">${objeto_quiz_criado.title}</a></div>
        <button class="btn-primario" onclick="chamaopenScreen2()">Acessar Quizz</button>
        <a class ="home" onclick="iniciaTela()">Voltar para home</a>
    </div>
    `
}


function temNivelZero(e){
    let nivelZero = false;

    const array_val_nivel = document.querySelectorAll("#acerto-min-nivel");
    console.log(array_val_nivel[0].value);

    for(let i = 0; i < n_niveis;i++){
        if(array_val_nivel[i].value == 0){
            nivelZero = true;
        }
    }

    if(!nivelZero){
        alert("É necessário criar pelo menos um Nível com '0'");
    }

    return nivelZero;

}

 

function setTelaQuatroCriaQuiz(e) {

    if(!temNivelZero()){
        e.preventDefault();
        return;
    };


    scroll_to("body");

    organizaValoresInseridosTelaTres();
    post_api_criar_quizz();
    
/*     document.querySelector(".cria-quiz").innerHTML = `
    <!--tela 3.4 - criado com sucesso -->
    <p class="title">Seu quizz está pronto!</p>
    <div class="quizz-pronto">
        <div class="quizz"><img src="${objeto_quiz_criado.image}"><a class="titulo-quizz">${objeto_quiz_criado.title}</a></div>
        <button class="btn-primario" onclick="openScreen2(${id_quizz_criado})">Acessar Quizz</button>
        <a class ="home" href="#home">Voltar para home</a>
    </div>
    ` */

    //comentei aqui 13:20
    document.querySelector(".cria-quiz").innerHTML = quizCriadoComSucesso();
}


//SERVIDOR LAYOUT 3
function sucesso_requisicao_post_servidor(requisicao) {
    
    //alert("deubom a requisicao de POST do Cria Quizz!");
    console.log(requisicao);
    console.log(requisicao.data.id);

    id_quizz_criado = requisicao.data.id;
    
    //renova a cada reload
    array_ids_meus_quizz.push(requisicao.data.id);

    if(localStorage.getItem(nome_quizLocalStorage)== undefined){
        localStorage.setItem(nome_quizLocalStorage,requisicao.data.id);
    }else{
        //console.log(localStorage.getItem("listaIDsQuizzess"));
        //pega o que tá armazenado no local storage
        let string = localStorage.getItem(nome_quizLocalStorage);
        //adiciona o novo id
        string += `,${requisicao.data.id}`;
        //e coloca no local storage
        localStorage.setItem(nome_quizLocalStorage,string);
        
        console.log("Lista com os IDs dos quizzees inseridos por mim")
        console.log(localStorage.getItem(nome_quizLocalStorage));
    }

    //após ser POSTado com sucesso chama página do Quiz Criado com Sucesso
    //document.querySelector(".cria-quiz").innerHTML = quizCriadoComSucesso();

}

function splitStringLocalStorage(){
    let string = localStorage.getItem(nome_quizLocalStorage);
    const dadosDeserializados = JSON.parse("["+string+"]");
    console.log(dadosDeserializados);
    return dadosDeserializados;
}


function post_api_criar_quizz() {
    
    objeto_quiz_criado = {
        title: titulo,
        image: url_img_quizz,
        questions: array_perguntas,
        levels:array_nivel
    };
    
    console.log(objeto_quiz_criado);
    
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", objeto_quiz_criado);
    
    requisicao.then(sucesso_requisicao_post_servidor);
    requisicao.catch(deuruim);

    //document.querySelector(".cria-quiz").innerHTML = quizCriadoComSucesso();

}

//post_api_criar_quizz();
//FIM DO SCRIPT CRIA QUIZZ********************



//AUTOMATIZANDO OS TESTES(economizando tempo)

function automatiza_testes_tela1() {

    document.querySelector("#titulo-quizz").value = "Titulo Pergunta muito louca";
    document.querySelector("#url-img-quizz").value = "https://c.tenor.com/JVsuDbgjIncAAAAM/crazy-insane.gif";
    document.querySelector("#n-perguntas-quizz").value = "3";
    document.querySelector("#n-niveis-quizz").value = "2";

}
//automatiza_testes_tela1();


function automatiza_testes_tela2() {
    for (let i = 0; i < n_perguntas; i++) {
        document.querySelector(`#tituloDaPergunta${i}`).value = `Titulo da pergunta ${i}`;
        document.querySelector(`#corHexadecimalPergunta${i}`).value = "#00b4d8";

        for (let j = 0; j < MAX_RESPOSTA; j++) {
            document.querySelector(`#pergunta${i} #textoDaResposta${j}`).value = `Respostaa ${j}`;
            document.querySelector(`#pergunta${i} #urlImgResposta${j}`).value = `https://http.cat/${j}`;
        }
    }
}

function automatiza_testes_tela3(){
     const array_titulos_nivel = document.querySelectorAll("#titulo-nivel");
     const array_acerto_min_nivel = document.querySelectorAll("#acerto-min-nivel");
     const array_descricao_nivel = document.querySelectorAll("#descricao-nivel");
     const array_url_img_nivel = document.querySelectorAll("#url-img-nivel");

    for(let i = 0; i < n_niveis; i++){
        array_titulos_nivel[i].value = `Titulo Nivel ${i}`;
        array_acerto_min_nivel[i].value = "10";
        array_url_img_nivel[i].value = `https://http.cat/${i}`;
        array_descricao_nivel[i].value = "A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real. Wikipédia";       
    }
}



/* function joga3NoServidor(){
    for(let i = 0 ; i < 3; i++ ){
        setTelaUmCriaQuiz();
        automatiza_testes_tela1();
        setTelaDoisCriaQuiz();
        setTelaTresCriaQuiz();
        setTelaQuatroCriaQuiz();
    }
    alert("foi");
}

joga3NoServidor(); 
 */