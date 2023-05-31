import express from "express";
import db from "./db.js";
import {
  create,
  findAll,
  findById,
  update,
  remove,
} from "./schemas/aluno.schema.js";

const app = express();
const port = 3000;

const alunos = [
  {
    id: 1,
    nome: "Lucas Dias",
    dataNasc: "2005-04-16",
    matricula: "2021319327",
    status: "Ativo",
    email: "mlfd1@aluno.ifal.edu.br",
  },
  {
    id: 2,
    nome: "Sofia Rizzotto",
    dataNasc: "2006-01-07",
    matricula: "2021321147",
    status: "Ativo",
    email: "spr2@aluno.ifal.edu.br",
  },
  {
    id: 3,
    nome: "João Pedro",
    dataNasc: "2006-11-26",
    matricula: "2021321148",
    status: "Ativo",
    email: "jpam1@aluno.ifal.edu.br",
  },
];

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const alunos = await findAll();
  res.render("home", { alunos: alunos });
});

app.get("/aluno/:id?", (req, res) => {
  const { id } = req.params;
  const aluno = alunos.find((aluno) => aluno.id === Number(id));

  if (aluno) {
    res.render("aluno", { title: "Editar Aluno", aluno: aluno });
  } else {
    res.render("aluno", { title: "Cadastrar Aluno", aluno: null });
  }
});

app.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const index = alunos.findIndex((aluno) => aluno.id === Number(id));

  if (index !== -1) {
    alunos.splice(index, 1);
  }
});

app.post("/alunos/:id?", (req, res) => {
  const { id } = req.params;
  const { nome, dataNasc, matricula, status, email } = req.body;

  if (id) {
    const index = alunos.findIndex((aluno) => aluno.id === Number(id));
    if (index !== -1) {
      alunos[index] = {
        id: Number(id),
        nome,
        dataNasc,
        matricula,
        status,
        email,
      };
    }
  } else {
    const newId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
    alunos.push({ id: newId, nome, dataNasc, matricula, status, email });
  }

  res.redirect("/");
});

app.listen(port, () => {
  db.sync();
  console.log(`App listening at http://localhost:${port}`);
});
