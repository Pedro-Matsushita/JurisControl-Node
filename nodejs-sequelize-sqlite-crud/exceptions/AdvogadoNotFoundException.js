class AdvogadoNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdvogadoNotFoundException';
    }
}

throw new AdvogadoNotFoundException('Advogado não encontrado.');
