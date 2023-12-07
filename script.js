let funcionarios = [];
let editIndex;

function openModal() {
  document.querySelector('.modal-container').classList.add('active');
}
function closeModal() {
  document.querySelector('.modal-container').classList.remove('active');
}

// Função para exibir funcionários na tabela
function displayFuncionarios() {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  funcionarios.forEach((funcionario, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${funcionario.nome}</td>
      <td>${funcionario.funcao}</td>
      <td>R$ ${funcionario.salario}</td>
      <td class="acao">
        <button onclick="editFuncionario(${index})"><i class='bx bx-edit'></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteFuncionario(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Função para adicionar um novo funcionário
function addFuncionario() {
  const nome = document.getElementById('m-nome').value;
  const funcao = document.getElementById('m-funcao').value;
  const salario = document.getElementById('m-salario').value;

  if (nome && funcao && salario) {
    if (editIndex !== undefined) {
      // Editar funcionário existente
      funcionarios[editIndex] = { nome, funcao, salario };
      editIndex = undefined; // Limpar o índice de edição
    } else {
      // Adicionar novo funcionário
      funcionarios.push({ nome, funcao, salario });
    }

    saveToLocalStorage(); // Salvar no armazenamento local
    displayFuncionarios(); // Atualizar a tabela
    closeModal(); // Fechar a modal
  }
}



// Função para editar um funcionário
function editFuncionario(index) {
  editIndex = index;
  const funcionario = funcionarios[index];

  // Preencher os campos da modal com os dados do funcionário
  document.getElementById('m-nome').value = funcionario.nome;
  document.getElementById('m-funcao').value = funcionario.funcao;
  document.getElementById('m-salario').value = funcionario.salario;

  openModal(); // Abrir a modal em modo de edição
}

// Função para excluir um funcionário splice: altera o array original e retorna um novo array
function deleteFuncionario(index) {
  funcionarios.splice(index, 1);
  saveToLocalStorage(); // Salvar no armazenamento local
  displayFuncionarios(); // Atualizar a tabela
}

// Função para carregar funcionários do armazenamento local
function loadFuncionarios() {
  const storedData = localStorage.getItem('funcionarios');
  funcionarios = storedData ? JSON.parse(storedData) : [];
  displayFuncionarios(); // Exibir funcionários na tabela
}

// Função para salvar funcionários no armazenamento local
function saveToLocalStorage() {
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

// Chamar a função de inicialização ao carregar a página
loadFuncionarios();
