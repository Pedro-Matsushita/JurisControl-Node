class ClienteNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ClienteNotFoundException';
    }
}

throw new ClienteNotFoundException('Cliente não encontrado.');
