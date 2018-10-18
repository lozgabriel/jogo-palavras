$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/frases",
        data: "data",
        dataType: "json",
        beforeSend: function() {
            $("#spinner").show();
        },
        success: function (response) {
            $("#erro, #spinner").hide();
            trocaFraseAleatoria(response);
        },
        error: function(){
            $("#erro").show();
        }
    });
}

function trocaFraseAleatoria(response){
    var frase = $(".frase")
    //math randon com response. length para pegar o valor total que estiver em response
    //Math.floor para arredondar o valor
    var numeroAleatorio = Math.floor(Math.random() * response.length);
    frase.text(response[numeroAleatorio].texto);

    //chama a função atualizaTamanhoFrase do MAIN.JS
    atualizaTamanhoFrase();
    atualizaTempo(response[numeroAleatorio].tempo);
}

function buscaFrase(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/frases",
        data: "data",
        dataType: "json",
        beforeSend: function() {
            $("#spinner").show();
        },
        success: function (response) {
            $("#erro, #spinner").hide();
            trocaFrase(response);
        },
        error: function(){
            $("#erro").show();
        }
    });
}

function trocaFrase(response){
    var fraseId = $("#frase-id").val();

    if(fraseId < 1 || fraseId > 9){
        $("#erro").show();
    }else{
        $("#erro").hide();
        var frase = $(".frase");
        frase.text(response[fraseId].texto);
        atualizaTamanhoFrase();
        atualizaTempo(response[fraseId].tempo);
    }
    
}