class AudienciaNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'AudienciaNotFoundException';
    }
}

throw new AudienciaNotFoundException('Audiência não encontrada.');
