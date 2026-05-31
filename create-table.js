import { sql } from "./db.js";

async function createTables() {
    try {
        await sql.query(`
            CREATE TABLE IF NOT EXISTS alunos (
                id_aluno INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                data_nasc DATE,
                email VARCHAR(100),
                telefone VARCHAR(20)
            )
        `);

        console.log("Tabela de alunos criada com sucesso!");
    } catch (err) {
        console.error("Erro ao criar tabela de alunos");
        console.error(err.message);
    }
}

createTables();