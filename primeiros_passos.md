Caso dê algum erro sobre bibliotecas, cole isso no terminal: 

npm install mysql2



==============================================================================
=== Para iniciar ===
Para rodar o código, recomendo a extensão do VsCode --- Code Runner ---
Após baixar, é só clicar no botão de play, no canto -- superior Direito --
==============================================================================



========== Para criar o banco, cole isso no Workbench ==========

CREATE DATABASE siga;
USE siga;

CREATE TABLE cursos (
 codigo VARCHAR(10) NOT NULL,
 curso VARCHAR(255) NOT NULL,
 ementa TEXT NOT NULL
);

INSERT INTO cursos (codigo, curso, ementa) VALUES
 ('ADS', 'Tecnologia em Análise e Desenvolvimento de Sistemas', 'Estrutura de Dados, Programação
Orientada a Objetos, Banco de Dados, Redes de Computadores'),
 ('GTI', 'Tecnologia em Gestão da Tecnologia da Informação', 'Gestão de Projetos, Governança de TI,
Gerenciamento de Redes, Gestão de Serviços de TI'),
 ('DG', 'Tecnologia em Design Gráfico', 'Design Gráfico, Publicidade e Propaganda, Ilustração,
Animação Digital');

SELECT * FROM cursos;