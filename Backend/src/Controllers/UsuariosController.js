import UsuariosModel from "../Models/Usuarios.js";

const UsuariosController = {};

// GET
UsuariosController.getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuariosModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// GET BY ID
UsuariosController.getUsuarioById = async (req, res) => {
    try {
        const usuario = await UsuariosModel.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// INSERT
UsuariosController.insertUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol, estado } = req.body;

        const newUsuario = new UsuariosModel({
            nombre,
            email,
            contraseña,
            rol,
            estado
        });

        await newUsuario.save();
        res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// UPDATE
UsuariosController.updateUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol, estado } = req.body;

        const usuarioFound = await UsuariosModel.findById(req.params.id);
        if (!usuarioFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await UsuariosModel.findByIdAndUpdate(
            req.params.id,
            { nombre, email, contraseña, rol, estado },
            { new: true }
        );

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// DELETE
UsuariosController.deleteUsuario = async (req, res) => {
    try {
        const usuarioFound = await UsuariosModel.findById(req.params.id);
        if (!usuarioFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await UsuariosModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default UsuariosController;
