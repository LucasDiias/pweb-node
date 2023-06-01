import express from "express";
import db from "./db.js";
import {
  create,
  findAll,
  findById,
  findAllByName,
  update,
  remove,
} from "./schemas/aluno.schema.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const alunos = await findAll();
  res.render("home", { alunos: alunos, search: null });
});

app.get("/aluno/:id?", async (req, res) => {
  const { id } = req.params;
  const aluno = await findById(id);

  if (aluno) {
    res.render("aluno", { title: "Editar Aluno", aluno: aluno });
  } else {
    res.render("aluno", { title: "Cadastrar Aluno", aluno: null });
  }
});

app.get("/alunos", async (req, res) => {
  const { search } = req.query;
  let alunos;

  if (search) {
    alunos = await findAllByName(search);
  } else {
    alunos = await findAll();
  }

  res.render("home", { alunos: alunos, search: search });
});

app.delete("/alunos/:id", async (req, res) => {
  const { id } = req.params;
  await remove(id);
});

app.post("/alunos/:id?", async (req, res) => {
  const { id } = req.params;
  const { nome, dataNasc, matricula, status, email } = req.body;

  if (id) {
    await update({ id, nome, dataNasc, matricula, status, email });
  } else {
    await create({ nome, dataNasc, matricula, status, email });
  }

  res.redirect("/");
});

app.listen(port, () => {
  db.sync();
  console.log(`App listening at http://localhost:${port}`);
});
