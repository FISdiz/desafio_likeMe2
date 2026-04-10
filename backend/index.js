const express = require('express');
const cors = require('cors');
const { obtenerPosts, agregarPost, likearPost, eliminarPost } = require('./consultas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET - obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await obtenerPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json('Error al obtener los posts');
    }
});

// POST - agregar un post
app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        const nuevoPost = await agregarPost(titulo, img, descripcion);
        res.json(nuevoPost);
    } catch (error) {
        res.status(500).json('Error al agregar el post');
    }
});

// PUT - sumar un like
app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await likearPost(id);
        res.json('Like agregado');
    } catch (error) {
        res.status(500).json('Error al likear el post');
    }
});

// DELETE - eliminar un post
app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.json('Post eliminado');
    } catch (error) {
        res.status(500).json('Error al eliminar el post');
    }
});

app.listen(PORT, console.log(`Servidor corriendo en puerto ${PORT}`));