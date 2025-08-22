const formatador = (data)=>{

    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana : {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },

        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')

    }

}

formatador(new Date('2025-08-16'))

const atividade = {
    nome: "Reunião com fornecedores",
    data: new Date("2025-08-16 10:00"),
    finalizada: true
};

let atividades = [
    atividade,
    {
        nome: 'Treinar o time de vendas',
        data: new Date("2025-08-17 12:00"),
        finalizada: false
    },
    {
        nome: 'Brainstorm com o criativo',
        data: new Date("2025-08-17 16:00"),
        finalizada: true
    }

];



const criarItemDeAtividade = (atividade)=>{

    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `

    if(atividade.finalizada){
        input +='checked'
    }

    input += '>'

    const formatar = formatador(atividade.data)

    return `
        <div class="card-bg">
            ${input}
            <div>
                <svg class="active" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
                    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                </svg>
                <svg class="inactive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
                    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                </svg>

                <span>${atividade.nome}</span>
            </div>
            <time class="short">   
                ${formatar.dia.semana.curto}.
                ${formatar.dia.numerico}<br>
                ${formatar.hora}
            </time>

            <time class="full">
                ${formatar.dia.semana.longo}, dia 
                ${formatar.dia.numerico} de 
                ${formatar.mes} às 
                ${formatar.hora}h
            </time>
        </div>
        `;
    
};


const atualizarListaDeAtividades = ()=>{
    
    const section = document.querySelector('section');
    section.innerHTML=''
    
    if(atividades.length == 0){
        section.innerHTML = `<p>Nenhuma atividade cadastrada. </p>`
        return
    }



    for(let atividade of atividades){
        section.innerHTML += criarItemDeAtividade(atividade);
    }

};

atualizarListaDeAtividades()

const salvarAtividade = (event)=>{
   event.preventDefault();
   const dadosDoFormulario = new FormData(event.target);
   const nome = dadosDoFormulario.get('atividade');
   const dia = dadosDoFormulario.get('dia');
   const hora = dadosDoFormulario.get('hora');
   const data = `${dia} ${hora}`
   
   const novaAtividade = {
    nome: nome,
    data: data,
    finalizada: false
};

    const atividadeExiste = atividades.find((atividade)=>{
        return atividade.data == novaAtividade.data;
    })
    if(atividadeExiste){
        return alert('Dia/Hora não disponível!')

    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()

}

const criarDiasSelecao = ()=>{
    const dias=[
        "2025-08-19",
        "2025-08-20",
        "2025-08-21",
        "2025-08-22",
        "2025-08-23"  
    ]

    let diasSelecao = '';

    for(let dia of dias){

        const formatar = formatador(dia);
        const diaFormatado = `${formatar.dia.numerico} de
                              ${formatar.mes}`

        diasSelecao += `
        <option value="${dia}"> ${diaFormatado}</option>
        `;
    }

    document.querySelector('select[name="dia"]').innerHTML= diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = ()=>{
    let horasDisponiveis= ''
    
    for(let i=6; i<23;i++){
        const hora = String(i).padStart(2, '0')
        horasDisponiveis+= `<option value="${hora}:00"> ${hora}:00 </option>`
        horasDisponiveis+= `<option value="${hora}:30"> ${hora}:30 </option>`
    }

    document.querySelector('select[name="hora"]').innerHTML= horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) =>{
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade)=>{
        return atividade.data == dataDesteInput  
    })

    if(!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada
}