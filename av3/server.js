import express from "express";

const app = express();
const port = 3000;

const alunos = [
  {
    matricula: "2021319327",
    nome: "Lucas Dias",
    dataNasc: "2005-04-16",
    status: "Ativo",
    email: "mlfd1@aluno.ifal.edu.br",
  },
  {
    matricula: "2021321147",
    nome: "Sofia Rizzotto",
    dataNasc: "2006-01-07",
    status: "Ativo",
    email: "spr2@aluno.ifal.edu.br",
  },
  {
    matricula: "2021321148",
    nome: "João Pedro",
    dataNasc: "2006-11-26",
    status: "Ativo",
    email: "jpam1@aluno.ifal.edu.br",
  },
];

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { alunos: alunos });
});

app.get("/aluno", (req, res) => {
  res.render("aluno");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
