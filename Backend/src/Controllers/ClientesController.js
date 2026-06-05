import ClientesModel from '../Models/Clientes.js';

const ClientesController = {}

ClientesController.getAllClientes = async (req, res) => {
    try {
        const clientes = await ClientesModel.find();
        return res.status(200).json(clientes);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

ClientesController.deleleteCliente = async (req, res) => {
    try {
        const deletedCliente = await ClientesModel.findByIdAndDelete(
            req.params.id
        );

        if (!deletedCliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        return res.status(200).json({ message: 'Cliente eliminado correctamente' });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

ClientesController.updateCliente = async (req, res) => {
    try {
        let {
            nombre,
            Apellido,
            correo,
            contraseña,
            telefono,
            estado,
            fechaRegistro,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body;

        nombre = nombre?.trim();
        correo = correo?.trim();

        if (nombre.length < 3 || nombre.length > 20) {
            return res.status(400).json({ message: 'Nombre Invalido' });
        }

        const updatedCliente = await ClientesModel.findByIdAndUpdate(
            req.params.id,
            {
                nombre,
                Apellido,
                correo,
                contraseña,
                telefono,
                estado,
                fechaRegistro,
                isVerified,
                loginAttemps,
                timeOut
            },
            { new: true }
        );

        if(!updatedCliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        return res.status(200).json("Cliente actualizado correctamente");

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

export default ClientesController;
