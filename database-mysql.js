import { sql } from "./db.js";

export class DatabaseMYSQL {

    async list(search) {
        let alunos;
        
        if (search) {
            [alunos] = await sql.execute(
                'SELECT * FROM alunos WHERE nome LIKE ?',
                [`%${search}%`]
            );
        } else {
            [alunos] = await sql.execute('SELECT * FROM alunos');
        }
        return alunos;
    }

    async create(aluno) {
        const { nome, data_nasc, email, telefone } = aluno;

        await sql.execute(
            'INSERT INTO alunos (nome, data_nasc, email, telefone) VALUES (?,?,?,?)',
            [nome, data_nasc, email, telefone]
        );
    }

    async update(id_aluno, aluno) {
        const { nome, data_nasc, email, telefone } = aluno;
        await sql.execute(
            'UPDATE alunos SET nome = ?, data_nasc = ?, email = ?, telefone = ? WHERE id_aluno = ?',
            [nome, data_nasc, email, telefone, id_aluno]
        );
    }
    
    async delete(id_aluno) {
        await sql.execute('DELETE FROM alunos WHERE id_aluno = ?', [id_aluno]);
    }
}