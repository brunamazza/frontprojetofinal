function logout() {
    localStorage.removeItem("userlogado");
    window.location = "index.html";
}

function carregardash() {
    localStorage.setItem("parceiro", document.getElementById("cmbagentes").value);
    window.location = "dash.html";
}


function carregarpagina() {
    var usuariostr = localStorage.getItem("userlogado");
    if (usuariostr == null) {
               
        document.getElementById("dados").innerHTML =
            "<h6>" + "Ze da Silva" + " (" + "ZESC" + ")</h6>"

        document.getElementById("foto").innerHTML =
            "<img src='img/ze.jpg' class='rounded-circle imguser' >";

  
    } else {
        var usuariojson = JSON.parse(usuariostr)
        document.getElementById("dados").innerHTML =
            "<h6>" + usuariojson.nome + " (" + usuariojson.racf + ")</h6>"

        document.getElementById("foto").innerHTML =
            "<img alt='" + usuariojson.nome + "' width='160' height='120' src=img/" + usuariojson.foto + ">";

    }
    exibiragentes();
    top10();
}



function exibiragentes() {
    fetch("http://localhost:8080/agentes")
        .then(res => res.json())
        .then(res => preenchercombo(res));
}

function preenchercombo(lista) {
    var saida = "<option hidden>Selecione o Parceiro</option>";
    for (contador = 0; contador < lista.length; contador++) {
        saida +=
            "<option value='" + lista[contador].idAgente + "'>" + lista[contador].nomeAgente + "</option>";
    }
    document.getElementById("cmbagentes").innerHTML = saida;
}



function top10() {
    fetch("http://localhost:8080/topagentes")
        .then(res => res.json())
        .then(res => preenchertabela(res));

}

function preenchertabela(lista) {
    var saida =
        "<table class='table'> " +
        "<thead>" +
        "<tr>" +
        "<th scope='col'>Parceiro</th>" +
        "<th scope='col'>Volume Transacional</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    for (contador = 0; contador < lista.length; contador++) {
        saida +=
            "<tr>" +
            "<th scope='row'>" + lista[contador].nomeAgente + "</th>" +
            "<th scope='row'>" + lista[contador].volumeTransacional + "</th>" +
            "</tr>";
    }

    saida += "</tbody></table>";
    document.getElementById("topagentes").innerHTML = saida;

}