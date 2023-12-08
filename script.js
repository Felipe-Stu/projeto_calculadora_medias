
/* Resumo do que está aqui embaixo:
Criei uma variável chamado "form" que está referenciada no HTML no formulário <form></form>
Peguei essa variável e coloquei um evento. O EventListener é como se o sistema estivesse esperando alguma ação para rodar
Então temos a ação "submit" para ativar a função
A função está como function(e). Tudo que está entre () são os parâmetros, ou seja, a função irá rodar seguindo o parâmetro que
será definido posteriomente.
O parâmetro "e" é para que evite o recarregamento da página sempre que enviar o formulário.
Depois disso são criadas mais duas variáveis, uma para nome e outr para data

Variável > Evento que será ativado ao submeter > Corre a função usando parâmetro (e)

*/

const atividades=[];
const notas=[];

let linhas = ''; //Primeiro crio uma variável para comportar todas as outras que irei criar chamadas "linha"

//aqui eu fiz uma variável const (quase mesma coisa de let e var, preciso estudar mais)
const form=document.getElementById('form-atividade');

//Crio também duas variáveis para as imagens, percisando apenas buscar onde quee stão essas imagens na pasta
const imgAprovado='<img src="./imgs/aprovado.png" alt="Emoji Celebrando"/>'
const imgReprovado='<img src="./imgs/reprovado.png" alt="Emoji Triste"/>'

form.addEventListener('submit', function(e){ //Peguei a variável "form" e coloquei um evento ao submeter, que é uma função chamada de (e)
    e.preventDefault(); //essa linha é para evitar que a página recarregue sempre que enviar o formulário
    adicionarLinha()
    atualizaTabela()
    atualizaMediaFinal()
});

function adicionarLinha(){
    //logo depois crio mais duas variáveis que estão relacionadas com o nome da matéria e nota
    const inputNomeAtividade=document.getElementById('nome-atividade');
    const inputNotaAtividade=document.getElementById('nota-atividade');

    atividades.push(parseFloat(inputNomeAtividade.value))
    notas.push(parseFloat(inputNotaAtividade.value))
    
    //Nessa parte eu crio uma variável "linha" que é uma tabela, dessa forma eu consigo colocar valores dentro dela
    let linha='<tr>';
    linha+=`<td>${inputNomeAtividade.value}</td>`;
    linha+=`<td>${inputNotaAtividade.value}</td>`;
    linha+=`<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`
    linha+='</tr>';
    //Aqui tá o pulo do gato. Pego a variável "linhas", que tava vazia, e acrescento sempre a variável "linha" à ela. Como coloquei linhas+=linha
    //significa que sempre será adicionada a nova variável linha criada.
    linhas+=linha

inputNomeAtividade.value='';
inputNotaAtividade.value='';
}

function atualizaTabela(){
    const corpoTabela=document.querySelector('tbody');
    corpoTabela.innerHTML=linhas;
}

function atualizaMediaFinal(){
    const mediaFinal = calcularMediaFinal();
    document.getElementById('media-final-valor').innerHTML=mediaFinal;
    document.getElementById('media-final-resultado').innerHTML=mediaFinal >=7 ? 'Aprovado' : 'Reprovado';
}

function calcularMediaFinal(){
    let somaDasNotas=0
    for (let i=0; i<notas.length;i++){
        somaDasNotas+=notas[i]
    }
    const mediaFinal=somaDasNotas/notas.length;
    const precisao=10;
    return Math.round(mediaFinal*precisao)/precisao;
}
