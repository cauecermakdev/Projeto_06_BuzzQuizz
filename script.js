
//*****************************************************
// SCRIPT LAYOUT 1 ************************************
function deuruim(error) {
    console.log("entra");
    console.log(error);
}


function iniciaTela() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promessa.then(comecaQuizz);
    promessa.catch(deuruim);
}
//iniciaTela(); 

function comecaQuizz(resposta) {
    console.log(resposta);
    const url = resposta.data[0].image;

    const printaTela = document.querySelector(".tela1");
    printaTela.innerHTML +=
        `
            <div class="container display-flex-center">
                <div class="conteudo-pagina display-flex-center">

                    <div class="seus-quizzes-vazio display-flex-center">
                        <h1>Você não criou nenhum quizz ainda :(</h1>
                        <div class="botao display-flex-center">Criar Quizz</div>

                    </div>
                    <div class="seus-quizzes-conteudo display-none">
                        <div class=" subtitulo display-flex-center">Seus Quizzes <img src="./img/botaoadd.png"></div>
                        <div class="quizz"><img src="./img/Potterhead.png"><a class="titulo-quizz">O quão Potterhead é
                            você?
                            O quão Potterhead é você? </a></div>
                        <div class="quizz"><img src="./img/Potterhead.png"><a class="titulo-quizz">O quão Potterhead é
                            você?</a></div>
                        <div class="quizz"><img src="./img/Potterhead.png"><a class="titulo-quizz">O quão Potterhead é
                            você?</a></div>
                    </div>

                    <div class="todos-os-quizzes display-flex-center">
                        <div class="subtitulo">Todos os Quizzes</div>

                    </div>

                </div>
            </div>
        `
    const puxaQuizz = document.querySelector(".todos-os-quizzes");
    for (let i = 0; i < resposta.data.length; i++) {
        puxaQuizz.innerHTML += `<div class="quizz" onclick=""><img src="${resposta.data[i].image}">
                                <a class="titulo-quizz">${resposta.data[i].title}</a></div>`
    }


}

//*****************************************************
// SCRIPT LAYOUT 2 ************************************

function comparador() { 
	return Math.random() - 0.5; 
}
let quizzNumber =0;
let numberOfQuestions = 0;
let numberOfCorrectAnswers = 0;
let score = 0;
let numberOfQuestionsAnswered = 0;
let varResponse;
let nextQuestion;


//pega o quizz do servidor e chama a openQuizz
function openScreen2(){
    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("display-none");
    const tela2 = document.querySelector(".tela2");
    tela2.classList.remove("display-none");
    quizzNumber = 34;
    const getSpecificQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzNumber}`);
    getSpecificQuizz.then(openQuizz);
}

//coloca na tela o quizz respectivo ao clicado
function openQuizz(response){
    varResponse = response.data;
    console.log(response.data);
    console.log(response.data.questions);
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
            if(response.data.questions[i].answers[j].isCorrectAnswer === true){
                arrayAnswers[j+i*4].classList.add('correctAnswer');
            } else{
                arrayAnswers[j+i*4].classList.add('wrongAnswer');
            }
        }

        let divQuestion = questionsQuizzDiv.children[i];
        let divColor = divQuestion.children[0]
        divColor.style.backgroundColor = `${response.data.questions[i].color}`
    }
    
}
openScreen2();

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
    
    for(let i =0; i < divAnswersParent.childElementCount; i++){
        if(divAnswersParent.children[i].classList.contains("selected") === false && divAnswersParent.children[i].classList.contains("correctAnswer") === true){
            divAnswersParent.children[i].classList.add("opacidade");
            divAnswersParent.children[i].classList.add("certa");
        } if(divAnswersParent.children[i].classList.contains("selected") === false && divAnswersParent.children[i].classList.contains("correctAnswer") === false){
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
    const tela2 = document.querySelector(".tela2");
    
    tela2.innerHTML += `<button class="resetQuizz" onclick="resetQuizz()">Reiniciar Quizz</button>
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
    const botao = document.querySelector('.resetQuizz');
    botao.classList.add('display-none');
    const botao2 = document.querySelector('.returnHome');
    botao2.classList.add('display-none');

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


//variaveis do quiz que vai ser criado_______________________

//Variáveis obtidas na tela 3.1
let titulo = "";
let url_img_quizz = "";
let n_perguntas = 0;
let n_niveis = 0;

//Variáveis obtidas na tela 3.2
let array_respostas = [];
let arrayPerguntas = [];


//____________________________________________________________



const array_answers = [];


//General functions**************************

function scroll_to(string) {
    const elementoQueQueroQueApareca = document.querySelector(string);
    elementoQueQueroQueApareca.scrollIntoView();
}


//SCRIPT CRIA QUIZZ*******************************************************************************


//coloca Cria Quiz, tela 1, "começar pelo começo" no HTML
//tela 3.1
function setTelaUmCriaQuiz() {
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
                    <input placeholder="Cor de fundo da pergunta" type="text" maxlength="7" minlength="7" id = "corHexadecimalPergunta${i}">
            </div>

            <!--<div class="pergunta-content">-->
            <!--talvez faça sentido colocar pra esconder dps-->
            <div class="group-inputs">
                <p class="title">Resposta correta</p>
                <input placeholder="Resposta correta" type="text" id = "textoDaRespostaCorreta${i}" required/>
                <input placeholder="URL da imagem" type="url" id = "urlImgRespostaCorreta${i}">
            </div>

            <div class="group-inputs">
                <p class="title">Respostas incorretas</p>
                <input placeholder="Resposta incorreta 1" type="text" id = "textoDaRespostaIncorretaUm${i}" required/>
                <input placeholder="URL da imagem 1" type="url" id = "urlImgRespostaIncorretaUm${i}">
            </div>
                
            <div class="group-inputs">
                <input placeholder="Resposta incorreta 2" type="text" id = "textoDaRespostaIncorretaDois${i}"> 
                <input placeholder="URL da imagem 2" type="url" id = "urlImgRespostaIncorretaDois${i}">
            </div>

            <div class="group-inputs">
                <input placeholder="Resposta incorreta 3" type="text" id = "textoDaRespostaIncorretaTres${i}">
                <input placeholder="URL da imagem 3" type="url" id = "urlImgRespostaIncorretaTres${i}">
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

    //for (let i = 0; i < n_perguntas; i++) {
    for (let i = 0; i < 1; i++) {

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

}


//pega os valores da tela dois e organiza no meu objeto arrayPerguntas
function organizaValoresInseridosTelaDois() {
    alert("dentro organizaValores");
    //arrayPerguntas = [];
    //array_respostas = [];

    let textoDaResposta = "";
    let urlImgResposta = "";
    let ehrespostaCorreta = false; //false or true
    let tituloDaPergunta = "";
    let corHexadecimalPergunta = "";
    

    let objetoResposta = {
/*         text: textoDaResposta,
        image: urlImgResposta,
        isCorrectAnswer: ehRespostaCorreta */
    }
    alert("dentro organizaValores, passa primeiro objeto");

    let objetoPergunta = {
/*         title: tituloDaPergunta,
        color: corHexadecimalPergunta,
        answers: array_respostas */
    }
    alert("dentro organizaValores, passa objetos");


    for (let i = 0; i < n_perguntas; i++) {
        alert("dentro for i");
        //pegar todos elementos do form
        tituloDaPergunta = document.querySelector(`#tituloDaPergunta${i}`).value;
        
        corHexadecimalPergunta = document.querySelector(`#corHexadecimalPergunta${i}`).value;

        objetoPergunta.title = tituloDaPergunta;
        objetoPergunta.corHexadecimalPergunta = corHexadecimalPergunta;

        //nas respostas


        /*        let car = {
                   "color": "red",
                   "type": "cabrio",
                   "registration": new Date('2016-05-02'),
                   "capacity": 2
                  }
               cars.push(car); */


        //Montando meus objetos de resposta para cada pergunta, por isso um for
        //VER NOS REQUISISTOS
        //pra cada pergunta no maximo tem 3 respostas - 1 correta e duas incorretas
        for (let j = 0; j < 1; j++) {
            alert("dentro for j");
            const valorTextoDaResposta = document.querySelector(`#pergunta${i} #textoDaRespostaCorreta${j}`).value;

            if (valorTextoDaResposta != null) {
                textoDaResposta = valorTextoDaResposta;

                const valorUrlImgResposta = document.querySelector(`#pergunta${i} #urlImgRespostaCorreta${j}`).value;
                if (valorUrlImgResposta != null) {
                    urlImgResposta = valorUrlImgResposta;
                } else {
                    urlImgResposta = "";
                }

                //seta isCorrectAnswer
                if (i == 0) {
                    ehRespostaCorreta = true;
                } else {
                    ehRespostaCorreta = false;
                }

                //coloca todos elementos anteriores em um objeto_resposta
                objetoResposta.text = textoDaResposta;
                objetoResposta.image = urlImgResposta;
                objetoResposta.isCorrectAnswer = ehRespostaCorreta;


                objetoPergunta.answers.push(objetoResposta);
            }
        }


        //coloco no meu objeto pergunta no arrayPerguntas[i]
        arrayPerguntas.push(objetoPergunta);

    }

    console.log(arrayPerguntas);

}

//tela 3.3
function setTelaTresCriaQuiz() {
    alert("entra setTelaTres");

    organizaValoresInseridosTelaDois();

    scroll_to("body");

    document.querySelector(".cria-quiz").innerHTML =
        `
    <p class="title">Comece pelo começo</p>

    <form onSubmit = "setTelaQuatroCriaQuiz()">
        <div class="card-inputs-quiz">
            <div class="group-inputs" data-identifier="level">
                <div class="card-edit select">
                    <p class="title">Nível 2</p>
                    <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
                </div>
                <input placeholder="Título do nível" type="text" minlength="10" id ="titulo-nivel" required/>
                <input placeholder="% de acerto mínima" type="number" min="0" max ="100" id ="acerto-min-nivel" required/>
                <input placeholder="URL da imagem do nível" type="url" id ="url-img-nivel" required/>
                <textarea placeholder="Descrição do nível" rows="5" minlength="30" type="text" id ="descricao-nivel" required/></textarea>
            </div>
        </div>

        <div class="card-edit">
            <p class="title">Nível 2</p>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>


        <div class="card-edit">
            <p class="title">Nível 3</p>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>


        <button class="btn-primario" >Finalizar Quizz</button>
    </form>

    `
}

//setTelaTresCriaQuiz();//essa funcao chama o Layout 3


//tela 3.4
function setTelaQuatroCriaQuiz() {
    scroll_to("body");

    document.querySelector(".cria-quiz").innerHTML = `
    <!--tela 3.4 - criado com sucesso -->
    <p class="title">Crie suas perguntas</p>
    <div class="quizz-pronto">
        <div class="quizz"><img src="./img/simpsons.png"><a class="titulo-quizz">O quão Potterhead é você?</a></div>
        <button class="btn-primario" onclick="setTelaTresCriaQuiz()">Acessar Quizz</button>
        <a class ="home" href="#home">Voltar para home</a>
    </div>
    `
}


//SERVIDOR LAYOUT 3
function deubom(requisicao) {
    alert("deubom!");
    console.log(requisicao);
}

function post_api_criar_quizz() {
    const objeto = {
        title: titulo,
        image: url_img_quizz,
        questions: arrayPerguntas,
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    };
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", objeto);
    requisicao.then(deubom);

}

//  post_api_criar_quizz();
//FIM DO SCRIPT CRIA QUIZZ********************Pergunta 1            

