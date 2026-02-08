const express = require("express"); // Acesso ao Express no node_modules
const cors = require("cors"); // Acesso a library que permite portas diferentes no front e no back
const { PrismaClient } = require("@prisma/client"); // Acesso ao Prisma

const app = express(); // Cria objeto onde será pendurado tudo para rodar no express
const prisma = new PrismaClient(); // Usa o acesso ao Prisma para conectar ao banco

app.use(cors()); // Permite que o React (que roda na porta 5173) converse com esse servidor
app.use(express.json()); // Permite que o servidor entenda dados em formato JSON

// Verifica se alguém entrou na tela inicial e envia uma mensagem
app.get("/", (req, res) => {
  return res.json({ message: "Servidor Ligou" });
});

// Rota de Login (Conecta com o Banco de Dados)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Busca o usuário no banco pelo e-mail
  const user = await prisma.users.findUnique({
    where: { email: email },
  });

  // 2. Se não achar o usuário, devolve erro
  if (!user) {
    return res.status(400).json({ message: "E-mail não encontrado." });
  }

  // 3. Se a senha não bater (comparação simples)
  if (user.password !== password) {
    return res.status(400).json({ message: "Senha incorreta." });
  }

  // 4. Se deu tudo certo
  return res.json({
    message: "Login realizado com sucesso!",
    userId: user.id,
    name: user.name,
  });
});

// Rota de Cadastro de Usuário
app.post("/users", async (req, res) => {
  const { email, password } = req.body;

  // 1. Validação: Verifica se o email já existe
  const userExists = await prisma.users.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({ message: "Este e-mail já está em uso." });
  }

  // 2. Lógica: Gera o nome a partir do email (tudo antes do @)
  // Exemplo: "joao@gmail.com" vira "joao"
  const generatedName = email.split("@")[0];

  // 3. Criação: Salva no banco
  const newUser = await prisma.users.create({
    data: {
      email,
      password,
      name: generatedName,
    },
  });

  // Retorna sucesso (201 = Created/Criado)
  return res.status(201).json({
    message: "Usuário criado com sucesso!",
    user: newUser,
  });
});

// Liga o servidor na porta 3333
app.listen(3333, () => {
  console.log("HTTP Server Running on http://localhost:3333");
});
