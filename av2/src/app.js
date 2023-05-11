import express from "express";

const app = express();

//Informa que o express deve converter automaticamente
//  o corpo requisições e respostas para JSON
app.use(express.json());

// Habilita CSS
app.use(express.static("public"));

//Lista de objetos que simula o nosso BD
const livros = [
  { id: 1, titulo: "Senhor dos Aneis" },
  { id: 2, titulo: "O Hobiit" },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  res.json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.json(livros);
});

app.post("/livros", (req, res) => {
  let livro = {
    id: livros[-1].id + 1,
    titulo: req.query.titulo,
  };
  livros.push(livro);
  res.json(livros);
});

app.delete("/livros/del/:id", () => {
  let index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.json(livros);
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;
