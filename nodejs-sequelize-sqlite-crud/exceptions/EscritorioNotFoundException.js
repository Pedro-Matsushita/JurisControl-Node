class EscritorioNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'EscritorioNotFoundException';
    }
}

throw new EscritorioNotFoundException('Escritório não encontrado.');
