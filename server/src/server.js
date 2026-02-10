const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { cpf, password } = req.body;

  const user = await prisma.users.findUnique({
    where: { cpf: cpf },
  });

  if (!user) {
    return res.status(400).json({ message: "Usuário Inexistente" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Senha incorreta" });
  }

  return res.json({
    message: "Login realizado com sucesso!",
    name: user.name,
  });
});

app.listen(3333, () => {
  console.log("HTTP Server Running on http://localhost:3333");
});
