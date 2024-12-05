const { Administrador, Escritorio } = require('../models');
const { AdministradorNotFoundException } = require('../exceptions');

class AdministradorService {

  async criarAdministrador(nome, email, senha) {
    const administrador = await Administrador.create({
      nome: nome,
      email: email,
      senha: senha,
    });
    return administrador;
  }

  async atualizarAdministrador(id, nome, email, senha, token) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
      throw new AdministradorNotFoundException('Administrador não encontrado.');
    }

    administrador.nome = nome;
    administrador.email = email;
    administrador.senha = senha;
    administrador.token = token;

    await administrador.save();
    return administrador;
  }


  async buscarPorIdAdministrador(id) {
    const administrador = await Administrador.findByPk(id, {
      include: {
        model: Escritorio,
        as: 'escritorio',
        attributes: ['id'],
      },
    });

    if (!administrador) {
      throw new AdministradorNotFoundException('Administrador não encontrado.');
    }

    return {
      id: administrador.id,
      nome: administrador.nome,
      email: administrador.email,
      senha: administrador.senha,
      token: administrador.token,
      escritorioId: administrador.escritorio ? administrador.escritorio.id : null,
    };
  }

  async buscarTodosAdministradores() {
    const administradores = await Administrador.findAll({
      include: {
        model: Escritorio,
        as: 'escritorio',
        attributes: ['id'],
      },
    });

    return administradores.map(administrador => ({
      id: administrador.id,
      nome: administrador.nome,
      email: administrador.email,
      senha: administrador.senha,
      token: administrador.token,
      escritorioId: administrador.escritorio ? administrador.escritorio.id : null,
    }));
  }

  async deletarAdministrador(id) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
      throw new AdministradorNotFoundException('Administrador não encontrado.');
    }

    await administrador.destroy();
  }
}

module.exports = new AdministradorService();
