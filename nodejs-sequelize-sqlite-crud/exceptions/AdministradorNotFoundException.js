class AdministradorNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdministradorNotFoundException';
    }
}

throw new AdministradorNotFoundException('Administrador não encontrado.');
