import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import ClienteModel from '../Models/Clientes.js';
import {config} from "../../config.js"

const loginClienteController = {}

loginClienteController.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const userFound = await ClienteModel.findOne({ correo });
        
        if (!userFound) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        if (userFound.timeOut && userFound.timeOut > new Date.now()) {
            return res.status(403).json({ message: 'Cuenta bloqueada' });
        }

        const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);

        if (!isMatch) {
            userFound.loginAttemps = (userFound.loginAttemps || 0) + 1;

            if (userFound.loginAttemps >= 5) {
                userFound.timeOut = new Date.now() + 15 * 60 * 1000;
                userFound.loginAttemps = 0;

                await userFound.save();

                return res.status(403).json({ message: 'Cuenta bloqueada' });
            }

            await userFound.save();
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jsonwebtoken.sign(
            {id : userFound._id, userType: "cliente"},
            config.JWT.secret,
            {expiresIn: '30d'}
        )

        res.cookie("AuthCookie", token);


        return res.status(200).json({ message: 'Login exitoso' });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

export default loginClienteController;