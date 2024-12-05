class DocumentoNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DocumentoNotFoundException';
    }
}

throw new DocumentoNotFoundException('Documento não encontrado.');
