

//SCRIPT CRIA QUIZZ*******************************************************************************


//coloca Cria Quiz, tela 1, "começar pelo começo" no HTML
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

//setTelaUmCriaQuiz();


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
