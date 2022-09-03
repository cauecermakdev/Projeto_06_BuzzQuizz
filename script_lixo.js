
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

setTelaUmCriaQuiz();//essa funcao chama o Layout 3


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
    <div class="card-inputs-quiz ${minimizado}" data-identifier="question-form">
        
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

    //comeco da tela 2
    document.querySelector(".cria-quiz").innerHTML = `
        <p class="title">Crie suas perguntas</p>
        <form onSubmit = "setTelaTresCriaQuiz()">
    `;

    for (let i = 0; i < n_perguntas; i++) {
        //troca corpo
        document.querySelector(".cria-quiz").innerHTML += `

            ${colocaPergunta(i)}

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
            </form>
        `


}


//pega os valores da tela dois e organiza no meu objeto arrayPerguntas
function organizaValoresInseridosTelaDois() {
    //arrayPerguntas = [];
    //array_respostas = [];

    let textoDaResposta = "";
    let urlImgResposta = "";
    let respostaCorreta = false; //false or true
    let tituloDaPergunta = "";
    let corHexadecimalPergunta = "";

    let objetoResposta = {
        text: textoDaResposta,
        image: urlImgResposta,
        isCorrectAnswer: ehRespostaCorreta
    }

    let objetoPergunta = {
        title: tituloDaPergunta,
        color: corHexadecimalPergunta,
        answers: array_respostas
    }


    textoDaResposta = document.querySelector("#titulo-quizz").value;
    url_img_quizz = document.querySelector("#url-img-quizz").value;
    n_perguntas = parseInt(document.querySelector("#n-perguntas-quizz").value);
    n_niveis = parseInt(document.querySelector("#n-niveis-quizz").value);



    for (let i = 0; i < n_perguntas; i++) {
        //pegar todos elementos do form
        tituloDaPergunta = document.querySelector(`.tituloDaPergunta${i}`).value;
        corHexadecimalPergunta = document.querySelector(`.corHexadecimalPergunta${i}`).value;

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
        for (let j = 0; j < 3; j++) {
            const valorTextoDaResposta = document.querySelector(`#pergunta${i} .textoDaRespostaCorreta${j}`).value;
            if (valorTextoDaResposta != null) {
                textoDaResposta = valorTextoDaResposta;

                const valorUrlImgResposta = document.querySelector(`#pergunta${i} .urlImgRespostaCorreta${j}`).value;
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

    //organizaValoresInseridosTelaDois();

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
