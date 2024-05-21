let lista_feriados = [
    { nome: "Confraternização Universal", data: new Date(parseInt(ano), 0, 1)},
    { nome: "Carnaval", data: calcularCarnaval(ano)},
    // { nome: "Cinzas", data: lista_feriados[2].data + 1}, // crasha
    { nome: "Sexta-Feira Santa", data: calcularSextaFeiraSanta(ano)},
    { nome: "Páscoa", data: calcularPascoa(ano)},
    { nome: "Tiradentes", data: new Date(parseInt(ano), 3, 21)},
    { nome: "Dia do Trabalho", data: new Date(parseInt(ano), 4, 1)},
    { nome: "Corpus Cristi (Corpo de Deus)", data: calcularCorpusChristi(ano)},
    { nome: "Independência do Brasil", data: new Date(parseInt(ano), 8, 7)},
    { nome: "Nossa Senhora Aparecida", data: new Date(parseInt(ano), 9, 12)},
    { nome: "Finados", data: new Date(parseInt(ano), 10, 2)},
    { nome: "Proclamação da República", data: new Date(parseInt(ano), 10, 15)},
    { nome: "Dia da Consciência Negra", data: new Date(parseInt(ano), 10, 20)},
    { nome: "Natal", data: new Date(parseInt(ano), 11, 25)},
    ];

// Define os nomes dos dias da semana
var diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
var potuacoes_dias = [-1.5, 1.5, 2.5, 1, 2.5, 1.5, -1.5];

var pontuacao_ano = 0;
var tabela_feriados_dia_semana = ``;
var feriadosSemana = [0, 0, 0, 0, 0, 0, 0];
var tabela_feriados = ``;
// Obtém o dia da semana (0 - domingo, 1 - segunda-feira, ..., 6 - sábado)
lista_feriados.forEach(feriado => {
    var pontuacao_dia = 0;
    feriadosSemana[feriado.data.getDay()] += 1;
    pontuacao_dia += pontuacoes_dias[feriado.data.getDay()]; // essa linha feriado.data.getDay()
    
    if (feriado.data.getDay() == 3 && feriado.nome == "Cinzas") {
        pontuacao_dia -= 0.5;
    }
    tabela_feriados += `Feriado: ${feriado.nome} - Data: ${feriado.data.toLocaleDateString('pt-BR')} (${diasDaSemana[feriado.data.getDay()]}) (${pontuacao_dia} pts)<br>`;
    pontuacao_ano += pontuacao_dia;
});
tabela_feriados += `PONTUAÇÃO TOTAL: ${pontuacao_ano}<br>`;

tabela_feriados_dia_semana += `Feriados por Dia da Semana <br>`;
//for (let i = 0; i < diasDaSemana.length; i++) {
//    tabela_feriados_dia_semana += `${diasDaSemana[i]}: ${feriadosSemana[i]} (${feriadosSemana[i] * pontuacoes_dias[i]} pts)<br>`;

//}




function calcularPascoa(ano) {
    var a = ano % 19;
    var b = Math.floor(ano / 100);
    var c = ano % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var mes = Math.floor((h + l - 7 * m + 114) / 31);
    var dia = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(ano, mes - 1, dia);
}

function calcularCarnaval(ano) {
    var dataPascoa = calcularPascoa(ano);
    var dataCarnaval = new Date(dataPascoa);
    dataCarnaval.setDate(dataPascoa.getDate() - 47);

    return dataCarnaval;
}

function calcularSextaFeiraSanta(ano) {
    var dataPascoa = calcularPascoa(ano);
    var dataSextaFeiraSanta = new Date(dataPascoa);
    dataSextaFeiraSanta.setDate(dataPascoa.getDate() - 2);

    return dataSextaFeiraSanta;
}

function calcularCorpusChristi(ano) {
    var dataPascoa = calcularPascoa(ano);
    var dataCorpusChristi = new Date(dataPascoa);
    dataCorpusChristi.setDate(dataPascoa.getDate() + 60);

    return dataCorpusChristi;
}