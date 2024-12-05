const { Cliente } = require('../models');
const { ClienteNotFoundException } = require('../exceptions');

class ClienteService {

  async criarCliente(nome, cpf, telefone, endereco, email, senha) {
    const cliente = await Cliente.create({
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      endereco: endereco,
      email: email,
      senha: senha,
    });
    return cliente;
  }

  async atualizarCliente(id, nome, telefone, endereco, tipo) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new ClienteNotFoundException('Cliente não encontrado.');
    }

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.endereco = endereco;
    cliente.tipo = tipo;

    await cliente.save();
    return cliente;
  }

  async buscarTodosClientes() {
    const clientes = await Cliente.findAll();
    return clientes.map(cliente => ({
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      tipo: cliente.tipo,
    }));
  }

  async buscarPorIdCliente(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new ClienteNotFoundException('Cliente não encontrado.');
    }

    return {
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      tipo: cliente.tipo,
    };
  }

  async deletarCliente(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new ClienteNotFoundException('Cliente não encontrado.');
    }

    await cliente.destroy();
  }
}

module.exports = new ClienteService();
