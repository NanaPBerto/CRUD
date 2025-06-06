const Fornecedor = require('../models/fornecedorModel');
const Categoria = require('../models/categoriaModel');

const fornecedorController = {
    createFornecedor: (req, res) => {
        const newFornecedor = {
            nome: req.body.nome,
            categoria: req.body.categoria,
        };

        Fornecedor.create(newFornecedor, (err, fornecedorId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    getFornecedorById: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/show', { fornecedor });
        });
    },

    getAllFornecedores: (req, res) => {
        const categoria = req.query.categoria || null;
        if (categoria) {
            Fornecedor.getAll((err, fornecedores) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('fornecedores/index', { fornecedores });
            });
        } else {
            // Corrigido: garantir resposta mesmo sem categoria
            Fornecedor.getAll((err, fornecedores) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('fornecedores/index', { fornecedores });
            });
        }
    },

    renderCreateForm: (req, res) => {
       Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('fornecedores/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            // Buscar categorias e renderizar o formulário de edição
            Categoria.getAll((catErr, categorias) => {
                if (catErr) {
                    return res.status(500).json({ error: catErr });
                }
                res.render('fornecedores/edit', { fornecedor, categorias });
            });
        });
    },

    updateFornecedor: (req, res) => {
        const fornecedorId = req.params.id;
        const updatedFornecedor = {
            nome: req.body.nome,
            categoria: req.body.categoria,
        };

        Fornecedor.update(fornecedorId, updatedFornecedor, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    deleteFornecedor: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.delete(fornecedorId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    }
};

module.exports = fornecedorController;
