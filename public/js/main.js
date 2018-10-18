var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaBordas();
    $("#botao-reiniciar").click(reiniciaJogo); 
    atualizaPlacar();
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

// pega o atualizaTempo de frase.js
function atualizaTempo(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    // One para executar a função uma única vez
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
    var cronometroID = setInterval( function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            
            if(tempoRestante < 1){    
                //Quando chegar a zero o clearinterval irá parar o cronometro
                clearInterval(cronometroID);
                finalizaJogo();
            }

        },1000);
    });
}

function finalizaJogo(){
    //Para colocar o atributo disabled usar o true, para retira-lo, usar o false;
    campo.attr("disabled", true); 
    campo.addClass("tempo-esgotado");
    inserePlacar();
}


function inicializaBordas(){
campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    //substr pega um pedaço da palavra da posição zero até o tamanho que eu digitei
    var comparavel = frase.substr(0, digitado.length);
    if(digitado == comparavel){
        campo.addClass("borda-correto");
        campo.removeClass("borda-errado");
    }else{
        campo.addClass("borda-errado");
        campo.removeClass("borda-correto");
    }
});
}

function reiniciaJogo(){
    campo.attr("disabled", false)
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("tempo-esgotado");
    inicializaCronometro();
    campo.removeClass("borda-errado");
    campo.removeClass("borda-correto");
}

