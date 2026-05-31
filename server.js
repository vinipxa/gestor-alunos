import { fastify } from 'fastify';
import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3333;
console.log('Variáveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get('/', async (request, reply) => {
    return { message: 'API server - Gestor de Alunos' };
});

const database = new DatabaseMYSQL();

server.post("/alunos", async (request, reply) => {
    const {nome, data_nasc, email, telefone} = request.body;
    await database.create({
        nome,
        data_nasc,
        email,
        telefone
    });
    console.log(await database.list());
    return reply.status(201).send();
})

server.get("/alunos", async (request) => {
    const search = request.query.search;
    console.log(search);
    const alunos = await database.list(search);
    return alunos;
})

server.get('/alunos/nome/:nome', async (request) => {
    const nome = request.params.nome;
    const alunos = await database.searchByName(nome);
    return alunos;
});

server.get('/alunos/:id_alunos', async (request, reply) => {
    const id_alunos = request.params.id_alunos;
    const aluno = await database.getById(id_alunos);

    if (!aluno) {
        return reply.status(404).send({ message: 'Aluno não encontrado' });
    }

    return aluno;
});

server.put('/alunos/:id_alunos', async (request, reply) => {
    const id_alunos = request.params.id_alunos;
    const { nome, data_nasc, email, telefone } = request.body;
    await database.update(id_alunos, {
        nome,
        data_nasc,
        email,
        telefone
    });
    return reply.status(204).send();
});

server.delete('/alunos/:id_alunos', async (request, reply) => {
    const id_alunos = request.params.id_alunos;
    await database.delete(id_alunos);
    return reply.status(204).send();
});

server.listen({port:PORT}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});