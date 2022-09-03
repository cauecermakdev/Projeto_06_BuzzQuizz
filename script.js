
//*****************************************************
// SCRIPT LAYOUT 1 ************************************
  function deuruim(error){
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

function openScreen2(){
    let quizzNumber = 33;
    const getSpecificQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzNumber}`);
    getSpecificQuizz.then(openQuizz);
}

function openQuizz(response){
    console.log(response.data);
    console.log(response.data.questions);
    const showQuizz= document.querySelector(".tela2");
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
        questionsQuizzDiv.innerHTML += `<div class="pergunta">
    <div class="questionamento display-flex-center" data-identifier="question"><a>${response.data.questions[i].title}</a></div>
    <div class="imagens"></div></div>`
        let arrayDivAnswers = document.querySelectorAll(`.imagens`);
        
        for(let j = 0; j < response.data.questions[i].answers.length; j++){
            arrayDivAnswers[i].innerHTML += `<div class="resposta" data-identifier="answer" onclick="selecionaResposta(this)">
            <img src="${response.data.questions[i].answers[j].image}">
            <div class="alternativa">${response.data.questions[i].answers[j].text}</div>
        </div>`
        
        let arrayAnswers = document.querySelectorAll(".resposta");
        console.log(arrayAnswers)
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

{/* 
            
            <div class="resposta" onclick="selecionaResposta(this)"><img
                            src="./img/gato.png">
                    <div class="alternativa">Gatíneo</div>
            </div>
            <div class="resposta" onclick="selecionaResposta(this)"><img
                            src="./img/gato.png">
                    <div class="alternativa">Gatíneo</div>
            </div>
            <div class="resposta" onclick="selecionaResposta(this)"><img
                            src="./img/gato.png">
                    <div class="alternativa">Gatíneo</div>
            </div>
     */}


//*****************************************************
// SCRIPT LAYOUT 3 ************************************


//variaveis do quiz que vai ser criado
//pegar dados da tela anterior antes de colocar a segunda tela
const titulo = "";
const url_img_quizz = "";
const n_perguntas = 0;
const n_niveis= 0 ;


const  array_answers = [];


//General functions**************************

function scroll_to(string){
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


function colocaPergunta(){
    return `
    <div class="card-inputs-quiz"  data-identifier="question-form">
        <div class="group-inputs">
            <div class="card-edit select">
                <p class="title">Pergunta 1</p>
                <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
            </div>
                <input placeholder="Texto da pergunta" type="text" minlength="20" required/>
                <input placeholder="Cor de fundo da pergunta" type="text" maxlength="7" minlength="7">
        </div>

        <!--<div class="pergunta-content">-->
        <!--talvez faça sentido colocar pra esconder dps-->
        <div class="group-inputs">
            <p class="title">Resposta correta</p>
            <input placeholder="Resposta correta" type="text" required/>
            <input placeholder="URL da imagem" type="url">
        </div>

        <div class="group-inputs">
            <p class="title">Respostas incorretas</p>
            <input placeholder="Resposta incorreta 1" type="text" required/>
            <input placeholder="URL da imagem 1" type="url">
        </div>
            
        <div class="group-inputs">
            <input placeholder="Resposta incorreta 2" type="text"> 
            <input placeholder="URL da imagem 2" type="url">
        </div>

        <div class="group-inputs">
            <input placeholder="Resposta incorreta 3" type="text">
            <input placeholder="URL da imagem 3" type="url">
        </div>
        <!-- fim de <div class="pergunta-content">-->

        <!--fim do group-inputs-->
    </div>
`;

    console.log("entrou");
}

//tela 3.2
function setTelaDoisCriaQuiz() {
    
    alert("aqui");
    //pegar dados da tela anterior antes de colocar a segunda tela
    titulo = document.querySelector("#titulo-quizz").value;
    console.log(titulo);
    url_img_quizz = document.querySelector("#url-img-quizz").value;
    console.log(url_img_quizz);
    n_perguntas = parseInt(document.querySelector("#n-perguntas-quizz").value);
    console.log(n_perguntas);
    n_niveis = parseInt(document.querySelector("#n-niveis-quizz").value);
    console.log(n_niveis);

    //comeco da tela 2
    document.querySelector(".cria-quiz").innerHTML = `
        <p class="title">Crie suas perguntas</p>
        <form onSubmit = "setTelaTresCriaQuiz()">
    `;

    for(let i = 0; i < n_perguntas; i++ ){
    //troca corpo
        document.querySelector(".cria-quiz").innerHTML += `

            ${colocaPergunta()}

            <!--ARRUMAR PARA ABRIR PERGUNTA CASO CLIQUE NO ICONE
            <div class="card-edit">
                <p class="title">Pergunta 2</p>
                <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
            </div>

            <div class="card-edit">
                <p class="title">Pergunta 3</p>
                <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
            </div>-->
        `
    }
        //colocando final da pagina
        document.querySelector(".cria-quiz").innerHTML += `
            <button type="submit" class="btn-primario">Prosseguir para criar níves</button>
        </form>`

    

    
}



//tela 3.3
function setTelaTresCriaQuiz() {
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

    document.querySelector(".cria-quiz").innerHTML =`
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
function deubom(requisicao){
    alert("deubom!");
    console.log(requisicao);
}

function post_api_criar_quizz(){
    const objeto = {
        title: titulo,  
        image: url_img_quizz,
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers:
                [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
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