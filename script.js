
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
            <input placeholder ="Quantidade de níveis do quizz" type="number" name="quantity" min="2" id="n-niveis" required/>
        </div>  

    <button type="submit" class="btn-primario">Prosseguir para criar perguntas</button>
    </form>
    `
}

setTelaUmCriaQuiz();//essa funcao chama o Layout 3



//tela 3.2
function setTelaDoisCriaQuiz() {
/* 
    if(!trata_inputs_tela1_cria_quizz()){
        return;//if(function())return false nao roda
    } */

    //troca corpo
    document.querySelector(".cria-quiz").innerHTML = `
    <p class="title">Crie suas perguntas</p>

    <form onSubmit = "setTelaTresCriaQuiz()">

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


        <!--ARRUMAR PARA ABRIR PERGUNTA CASO CLIQUE NO ICONE-->
        <div class="card-edit">
            <p class="title">Pergunta 2</p>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>

        <div class="card-edit">
            <p class="title">Pergunta 3</p>
            <ion-icon name="create-outline" data-identifier="expand"></ion-icon>
        </div>

        <button type="submit" class="btn-primario">Prosseguir para criar níves</button>

    </form>
    `
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

function deubom(requisicao){
    alert("deubom!");
    console.log(requisicao);
}

function post_api_criar_quizz(){
    const objeto = {
        title: "Título do quizz",
        image: "https://http.cat/411.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
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

post_api_criar_quizz();
//FIM DO SCRIPT CRIA QUIZZ********************Pergunta 1