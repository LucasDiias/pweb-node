import express from "express";
import methodOverride from "method-override";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");

//Informa que o express deve converter automaticamente
//  o corpo requisições e respostas para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true -> permite objetos complexos / false -> permite apenas strings e arrays

// Configurando method override
app.use(methodOverride("_method")); // _method -> nome do campo que vai ser enviado no form para indicar o método que será usado.

// Habilita CSS
app.use(express.static("public"));

//Lista de objetos que simula o nosso BD
const livros = [
  { id: 1, titulo: "Senhor dos Aneis" },
  { id: 2, titulo: "O Hobbit" },
];

// ROTAS DE RENDERIZAÇÃO

app.get("/", (req, res) => {
  res.status(200).render("home", { livros: livros });
});

app.get("/cadastro", (req, res) => {
  res.status(200).render("cadastro");
});

// ------------------------------

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

// ROTAS POST E DELETE

app.post("/livros", (req, res) => {
  let livro = {
    id: livros.length === 0 ? 1 : livros.at(-1).id + 1,
    titulo: req.body.titulo,
  };
  livros.push(livro);
  res.redirect("/");
});

app.delete("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.redirect("/");
});

// -----------------------------

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;
