

//SCRIPT CRIA QUIZZ*******************************************************************************


//coloca Cria Quiz, tela 1, "começar pelo começo" no HTML
function setTelaUmCriaQuiz(){ 
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



function mudaTituloCriaQuiz(titulo){
    console.log(titulo);
    console.log(typeof(titulo));
    
    document.querySelector(".cria-quiz .title").innerHTML = titulo;
}

function setTelaDoisCriaQuiz(){
    //troca titulo
    mudaTituloCriaQuiz("Agora, decida os níveis!");

    //troca corpo
    document.querySelector(".card-inputs-quiz").innerHTML = `
        <input placeholder ="Título do seu quizz" type="text">
        <input placeholder ="URL da imagem do seu quizz" type="text">
        <input placeholder ="Título do seu quizz" type="text">
        <input placeholder ="Título do seu quizz" type="text">
    `
}

//FIM DO SCRIPT CRIA QUIZZ*******************************************************************************