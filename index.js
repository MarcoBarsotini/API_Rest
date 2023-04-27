const express = require("express");
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Conexão do banco e blablabla
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'siga'
});

app.get('/cursos', async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM cursos');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao listar os cursos:', err);
    res.status(500).send('Erro ao listar os cursos');
  }
});

// Listar um curso específico
app.get('/cursos/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM cursos WHERE codigo = ?', [codigo]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send(`Curso com código ${codigo} não encontrado`);
    }
  } catch (err) {
    console.error(`Erro ao buscar o curso com código ${codigo}:`, err);
    res.status(500).send(`Erro ao buscar o curso com código ${codigo}`);
  }
});

// Criar um novo curso
app.post('/cursos', async (req, res) => {
  const { codigo, nome } = req.body;
  try {
    await pool.execute('INSERT INTO cursos (codigo, nome) VALUES (?, ?)', [codigo, nome]);
    res.status(201).send('Curso criado com sucesso');
  } catch (err) {
    console.error('Erro ao criar o curso:', err);
    res.status(500).send('Erro ao criar o curso');
  }
});

// Atualizar um curso existente
app.put('/cursos/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  const { nome } = req.body;
  try {
    const [rows, fields] = await pool.execute('UPDATE cursos SET nome = ? WHERE codigo = ?', [nome, codigo]);
    if (rows.affectedRows > 0) {
      res.status(200).send(`Curso com código ${codigo} atualizado com sucesso`);
    } else {
      res.status(404).send(`Curso com código ${codigo} não encontrado`);
    }
  } catch (err) {
    console.error(`Erro ao atualizar o curso com código ${codigo}:`, err);
    res.status(500).send(`Erro ao atualizar o curso com código ${codigo}`);
  }
});

// Excluir um curso existente
app.delete('/cursos/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const [rows, fields] = await pool.execute('DELETE FROM cursos WHERE codigo = ?', [codigo]);
    if (rows.affectedRows > 0) {
      res.status(200).send(`Curso com código ${codigo} excluído com sucesso`);
    } else {
      res.status(404).send(`Curso com código ${codigo} não encontrado`);
    }
  } catch (err) {
    console.error(`Erro ao excluir o curso com código ${codigo}:`, err);
    res.status(500).send(`Erro ao excluir o curso com código ${codigo}`);
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});