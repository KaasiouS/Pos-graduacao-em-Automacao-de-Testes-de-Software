const usuarios = [
  { id: 1, nome: 'Cacio Santos', email: 'ana@email.com', senha: 'cacio123', expirado: false },
  { id: 2, nome: 'Cacio Souza', email: 'bruno@email.com', senha: 'cacio456', expirado: true },
  { id: 3, nome: 'Acacio Leonardo dos Santos', email: 'carla@email.com', senha: 'Acacio789', expirado: false },
  { id: 4, nome: 'Cacio is Testing', email: 'diego@email.com', senha: 'cacio321', expirado: false },
]

function fazerLogin(email, senha) {
  let usuarioEncontrado = null

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      usuarioEncontrado = usuarios[i]
      break
    }
  }

  if (!usuarioEncontrado) {
    return 'Credenciais incorretas'
  }

  if (usuarioEncontrado.senha !== senha) {
    return 'Credenciais incorretas'
  }

  if (usuarioEncontrado.expirado) {
    return 'Renove suas credenciais'
  }

  return 'Login realizado com sucesso'
}

// teste 1 - sucesso
let resultado1 = fazerLogin('ana@email.com', 'cacio123')
if (resultado1 === 'Login realizado com sucesso') {
  console.log('Teste 1 passou - login com sucesso')
} else {
  console.log('Teste 1 falhou - esperado: Login realizado com sucesso, recebeu: ' + resultado1)
}

// teste 2 - credencial expirada
let resultado2 = fazerLogin('bruno@email.com', 'cacio456')
if (resultado2 === 'Renove suas credenciais') {
  console.log('Teste 2 passou - credencial expirada')
} else {
  console.log('Teste 2 falhou - esperado: Renove suas credenciais, recebeu: ' + resultado2)
}

// teste 3 - usuario nao encontrado
let resultado3 = fazerLogin('naoexiste@email.com', 'qualquer')
if (resultado3 === 'Credenciais incorretas') {
  console.log('Teste 3 passou - usuario nao encontrado')
} else {
  console.log('Teste 3 falhou - esperado: Credenciais incorretas, recebeu: ' + resultado3)
}

// teste 4 - senha errada
let resultado4 = fazerLogin('Caciowrongpassword@email.com', 'senhaerrada')
if (resultado4 === 'Credenciais incorretas') {
  console.log('Teste 4 passou - senha errada')
} else {
  console.log('Teste 4 falhou - esperado: Credenciais incorretas, recebeu: ' + resultado4)
}
