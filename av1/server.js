import express from "express";

const app = express();
const port = "8000";

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

const planetas = [
  { nome: "Mercúrio", diametro: 4879, distanciaSol: 57910000 },
  { nome: "Vênus", diametro: 12104, distanciaSol: 108200000 },
  { nome: "Terra", diametro: 12756, distanciaSol: 149600000 },
  { nome: "Marte", diametro: 6792, distanciaSol: 227940000 },
  { nome: "Júpiter", diametro: 142984, distanciaSol: 778330000 },
  { nome: "Saturno", diametro: 120536, distanciaSol: 1429400000 },
  { nome: "Urano", diametro: 51118, distanciaSol: 2870990000 },
  { nome: "Netuno", diametro: 49528, distanciaSol: 4504300000 },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/planetas", (req, res) => {
  res.render("planetas", { planetas: planetas });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
