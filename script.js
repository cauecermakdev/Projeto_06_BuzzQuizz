

//SCRIPT CRIA QUIZZ*******************************************************************************


//coloca Cria Quiz, tela 1, "começar pelo começo" no HTML
//tela1
iniciaTela();
function iniciaTela() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promessa.then(comecaQuizz);
}

function comecaQuizz(resposta) {
    console.log(resposta);
    const url = resposta.data[0].image;


    const printaTela = document.querySelector("body");
    printaTela.innerHTML +=
        `<div class="tela1 display-flex-center">
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
        </div>`
    const puxaQuizz = document.querySelector(".todos-os-quizzes");
    for (let i = 0; i < resposta.data.length; i++) {
        puxaQuizz.innerHTML += `<div class="quizz" onclick=""><img src="${resposta.data[i].image}">
                                <a class="titulo-quizz">${resposta.data[i].title}</a></div>`
    }


}

/* function imprime(resposta) {
    console.log(resposta.data);


    teste.innerHTML = `<img src ="${url}">`;
} */

//tela 3.1
function setTelaUmCriaQuiz() {
    const seletor = document.querySelector(".cria-quiz");
    seletor.innerHTML = `
    
    <p class="title">Comece pelo começo</p>

    <div class="card-inputs-quiz">
        <input placeholder ="Título do seu quizz" type="text">
        <input placeholder ="URL da imagem do seu quizz" type="text">
        <input placeholder ="Título do seu quizz" type="text">
        <input placeholder ="Título do seu quizz" type="text">
    </div>  

    <button class="btn-primario" onclick = "setTelaDoisCriaQuiz()">Prosseguir para criar perguntas</button>
    `
}

//setTelaUmCriaQuiz();//essa funcao chama o Layout 3


//tela 3.2
function setTelaDoisCriaQuiz() {

    //troca corpo
    document.querySelector(".cria-quiz").innerHTML = `
    <p class="title">Crie suas perguntas</p>

    <div class="card-inputs-quiz">

        <div class="group-inputs">
            <p class="title">Pergunta 1</p>
            <input placeholder="Texto da pergunta" type="text">
            <input placeholder="Cor de fundo da pergunta" type="text">
        </div>

        <!--<div class="pergunta-content">-->
        <!--talvez faça sentido colocar pra esconder dps-->
        <div class="group-inputs">
            <p class="title">Resposta correta</p>
            <input placeholder="Resposta correta" type="text">
            <input placeholder="URL da imagem" type="text">
        </div>

        <div class="group-inputs">
            <p class="title">Respostas incorretas</p>
            <input placeholder="Resposta incorreta 1" type="text">
            <input placeholder="URL da imagem 1" type="text">
        </div>

        <div class="group-inputs">
            <input placeholder="Resposta incorreta 2" type="text">
            <input placeholder="URL da imagem 2" type="text">
        </div>

        <div class="group-inputs">
            <input placeholder="Resposta incorreta 3" type="text">
            <input placeholder="URL da imagem 3" type="text">
        </div>
        <!-- fim de <div class="pergunta-content">-->

        <!--fim do group-inputs-->
    </div>

    <div class="card-edit">
        <p class="title">Pergunta 2</p>
        <ion-icon name="create-outline"></ion-icon>
    </div>

    <div class="card-edit">
        <p class="title">Pergunta 3</p>
        <ion-icon name="create-outline"></ion-icon>
    </div>

    <button class="btn-primario" onclick="setTelaTresCriaQuiz()">Prosseguir para criar níves</button>
    `
}

//tela 3.3
function setTelaTresCriaQuiz() {
    document.querySelector(".cria-quiz").innerHTML =
        `
    <p class="title">Comece pelo começo</p>

    <div class="card-inputs-quiz">
        <div class="group-inputs">
            <div class="card-edit select">
                <p class="title">Nível 2</p>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <input placeholder="Título do nível" type="text">
            <input placeholder="% de acerto mínima" type="text">
            <input placeholder="URL da imagem do nível" type="text">
            <textarea placeholder="Descrição do nível" rows="5" type="text"></textarea>
        </div>
    </div>

    <div class="card-edit">
        <p class="title">Nível 2</p>
        <ion-icon name="create-outline"></ion-icon>
    </div>


    <div class="card-edit">
        <p class="title">Nível 3</p>
        <ion-icon name="create-outline"></ion-icon>
    </div>


    <button class="btn-primario" onclick="">Finalizar Quizz</button>

    `
}


//FIM DO SCRIPT CRIA QUIZZ********************Pergunta 1


