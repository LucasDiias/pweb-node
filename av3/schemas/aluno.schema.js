import Aluno from "../aluno.js";
import { Op } from "sequelize";

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
  return await Aluno.findAll();
}

export async function findById(id) {
  return await Aluno.findByPk(id);
}

export async function findAllByName(nome) {
  return await Aluno.findAll({ where: { nome: { [Op.like]: `%${nome}%` } } });
}

export async function update(data) {
  const aluno = await Aluno.findByPk(data.id);
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
