class RegistroDeInfoNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RegistroDeInfoNotFoundException';
    }
}

throw new RegistroDeInfoNotFoundException('Registro de informações não encontrado.');
