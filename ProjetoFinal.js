function adicionarPessoa() {
  const nome = document.getElementById("nomePessoa").value.trim();
  if (!nome) {
    alert("Por favor, digite o nome da pessoa.");
    return;
  }

  const container = document.getElementById("tarefasContainer");

  // Cria coluna da pessoa
  const coluna = document.createElement("div");
  coluna.className = "coluna";

  // Título com nome da pessoa
  const titulo = document.createElement("h2");
  titulo.textContent = nome;
  coluna.appendChild(titulo);

  // Formulário para nova tarefa
  const formWrapper = document.createElement("div");

  const inputTarefa = document.createElement("textarea");
  inputTarefa.placeholder = "Descrição detalhada da tarefa";
  inputTarefa.rows = 4;
  inputTarefa.style.width = "100%";
  formWrapper.appendChild(inputTarefa);

  const inputData = document.createElement("input");
  inputData.type = "date";
  formWrapper.appendChild(inputData);

  const inputChecklist = document.createElement("textarea");
  inputChecklist.placeholder = "Checklist (um item por linha)";
  inputChecklist.rows = 3;
  inputChecklist.style.width = "100%";
  formWrapper.appendChild(inputChecklist);

  const btnAdd = document.createElement("button");
  btnAdd.textContent = "Adicionar Tarefa";
  formWrapper.appendChild(btnAdd);

  coluna.appendChild(formWrapper);

  // Botão para abrir o formulário novamente
  const btnNovaTarefa = document.createElement("button");
  btnNovaTarefa.textContent = "+ Nova Tarefa";
  btnNovaTarefa.style.display = "none";
  btnNovaTarefa.onclick = () => {
    formWrapper.style.display = "block";
    btnNovaTarefa.style.display = "none";
  };
  coluna.appendChild(btnNovaTarefa);

  // Adiciona tarefa ao clicar em Adicionar
  btnAdd.onclick = () => {
    const desc = inputTarefa.value.trim();
    const prazo = inputData.value;
    const checklistText = inputChecklist.value.trim();

    if (!desc) {
      alert("Digite uma descrição para a tarefa.");
      return;
    }

    const checklist = checklistText.split('\n').filter(l => l.trim());

    // Cria div da tarefa
    const tarefa = document.createElement("div");
    tarefa.className = "tarefa";
    tarefa.textContent = desc.length > 30 ? desc.slice(0, 30) + "..." : desc;

    // Ao clicar na tarefa, abre modal com detalhes e checklist
    tarefa.onclick = () => {
      document.getElementById("modal-desc").textContent = desc;
      document.getElementById("modal-prazo").textContent = prazo || "Sem data";

      const ul = document.getElementById("modal-checklist");
      ul.innerHTML = "";

      checklist.forEach((item, index) => {
        const li = document.createElement("li");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.onchange = atualizarProgresso;
        li.appendChild(check);
        li.appendChild(document.createTextNode(" " + item));
        ul.appendChild(li);
      });

      function atualizarProgresso() {
        const total = checklist.length;
        const checks = ul.querySelectorAll("input[type='checkbox']");
        let marcados = 0;
        checks.forEach(c => { if (c.checked) marcados++; });
        const porcentagem = total ? Math.round((marcados / total) * 100) : 0;
        document.getElementById("modal-progresso").textContent = `Concluído: ${porcentagem}%`;
      }

      atualizarProgresso();
      document.getElementById("modal").style.display = "block";
    };

    coluna.appendChild(tarefa);

    // Limpa campos e esconde formulário
    inputTarefa.value = "";
    inputData.value = "";
    inputChecklist.value = "";

    formWrapper.style.display = "none";
    btnNovaTarefa.style.display = "block";
  };

  container.appendChild(coluna);
  document.getElementById("nomePessoa").value = "";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}
function atualizarRelogio() {
  const relogio = document.getElementById('relogio');
  const agora = new Date();

  // Formatar o horário em HH:mm:ss
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');

  relogio.textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza o relógio assim que a página carrega
atualizarRelogio();

// Depois atualiza a cada 1 segundo (1000 ms)
setInterval(atualizarRelogio, 1000);
