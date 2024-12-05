class ProcessoNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProcessoNotFoundException';
    }
}

throw new ProcessoNotFoundException('Processo não encontrado.');
class ProcessoNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProcessoNotFoundException';
    }
}

// Como lançar a exceção
throw new ProcessoNotFoundException('Processo não encontrado.');
