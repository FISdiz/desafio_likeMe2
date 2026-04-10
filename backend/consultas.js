const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likemept2',
    allowExitOnIdle: true
});

const obtenerPosts = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        return rows;
    } catch (error) {
        console.error('Error al obtener posts:', error);
        throw error;
    }
};

const agregarPost = async (titulo, img, descripcion) => {
    try {
        const consulta = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0) RETURNING *';
        const values = [titulo, img, descripcion];
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    } catch (error) {
        console.error('Error al agregar post:', error);
        throw error;
    }
};

const likearPost = async (id) => {
    try {
        await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error al likear post:', error);
        throw error;
    }
};

const eliminarPost = async (id) => {
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error al eliminar post:', error);
        throw error;
    }
};

module.exports = { obtenerPosts, agregarPost, likearPost, eliminarPost };