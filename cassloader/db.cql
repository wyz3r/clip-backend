CREATE KEYSPACE IF NOT EXISTS autodashboard WITH replication = {'class': 'SimpleStrategy', 'replication_factor':1};
-- -- CREATE KEYSPACE analyzer WITH replication = {'class': 'NetworkTopologyStrategy', 'DLRMAXCOM': '3'}  AND durable_writes = true;
CREATE TABLE autodashboard.users (
  user_id VARCHAR,
  role_user VARCHAR,
  PRIMARY KEY (user_id)
);

INSERT into autodashboard.users (user_id, role_user) values 
  ('lislas@delarivagroup.com', 'Admin');
  
CREATE TABLE autodashboard.projects (
    project_id timeuuid,
    project_name varchar,
    config varchar,
    description varchar,
    marcas varchar,
    categoria varchar,
    PRIMARY KEY (project_id)
);

INSERT INTO autodashboard.projects (project_id, project_name, marcas ) VALUES
  (abf9e83c-8c34-11e8-8353-d1580c01fad8,'dashboard Clip', 'fintech' );

CREATE TABLE autodashboard.questions (
    project_id timeuuid,
    questions_id varchar,
    title varchar,
    type varchar,
    opciones varchar,
    relevancia varchar,
    archive boolean,
    PRIMARY KEY (project_id, questions_id)
);

INSERT INTO autodashboard.questions (project_id, questions_id, title, type, opciones, relevancia ) VALUES
  (abf9e83c-8c34-11e8-8353-d1580c01fad8,'F4', 'Género', 'Unica', '["Hombre", "Mujer"]', 'Filtro');

INSERT INTO autodashboard.questions (project_id, questions_id, title, type, opciones, relevancia ) VALUES
  (abf9e83c-8c34-11e8-8353-d1580c01fad8,'F5', 'Edad', 'Unica', '["18 a 25", "26 a 35", "36 a 45", "46 o más"]', 'Filtro');

INSERT INTO autodashboard.questions (project_id, questions_id, title, type, opciones, relevancia ) VALUES
  (abf9e83c-8c34-11e8-8353-d1580c01fad8,'A1', 'NSE', 'Unica', '["ABC+", "C", "C-/D+"]', 'Filtro');

INSERT INTO autodashboard.questions (project_id, questions_id, title, type, opciones, relevancia ) VALUES
  (abf9e83c-8c34-11e8-8353-d1580c01fad8,'F6', 'Residencia', 'Unica', '["Valle de México", "Guadalajara", "Monterrey", "Estado de México", "Quintana Roo"]', 'Filtro');

CREATE TABLE autodashboard.informantes (
    project_id timeuuid,
    informante_id varchar,
    answers varchar,
    PRIMARY KEY (project_id, informante_id)
);

-- INSERT INTO autodashboard.informantes (project_id, informante_id, answers ) VALUES
--   (abf9e83c-8c34-11e8-8353-d1580c01fad8,'201812106', '{"Response ID": "2019marzo107",NSE: "AB",Edad: 46,Sexo: "M",Estado: "Distrito Federal","P1": "Sí", ola: "2019marzo"}');