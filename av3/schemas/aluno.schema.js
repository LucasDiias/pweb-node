import Aluno from "../aluno.js";

export async function create(data) {
  return await Aluno.create({
    nome: data.nome,
    dataNasc: data.dataNasc,
    matricula: data.matricula,
    status: data.status,
    email: data.email,
  });
}

export async function findAll() {
  return await JSON.stringify(Aluno.findAll());
}

export async function findById(id) {
  return await Aluno.findByPk(id);
}

export async function update(data) {
  const aluno = await Aluno.findById(data.id);
  aluno.set({
    nome: data.nome,
    dataNasc: data.dataNasc,
    matricula: data.matricula,
    status: data.status,
    email: data.email,
  });
  return await aluno.save();
}

export async function remove(id) {
  return await Aluno.destroy({ where: { id } });
}
