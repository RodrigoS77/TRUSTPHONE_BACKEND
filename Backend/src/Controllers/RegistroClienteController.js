import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ClienteModel from '../Models/Clientes.js';

import {config} from "../../config.js"

const RegistroClienteController = {}

RegistroClienteController.registerCliente = async (req, res) => {
    
    const {
        nombre,
        apellido,
        correo,
        contraseña,
        telefono,
        estado,
        fechaRegistro,
        isVerified,
        loginAttemps,
        timeOut
    } = req.body;

    try {
        const existCliente = await ClienteModel.findOne({ correo });
        if (existCliente) {
            return res.status(400).json({ message: 'El correo ya esta registrado' });
        }

        console.log(req.body);
        console.log("contraseña:", contraseña);

        const passwordHash = await bcrypt.hash(contraseña, 10);

        const verificationCode = crypto.randomBytes(3).toString('hex');

        const tokenCode = jsonwebtoken.sign(
            {
                correo,
                verificationCode,
                nombre,
                apellido,
                passwordHash,
                telefono,
                estado,
                fechaRegistro,
                isVerified,
                loginAttemps,
                timeOut
            },
            config.JWT.secret,

            {expiresIn: '15min'}
        );

        res.cookie("VerificationToken", tokenCode, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: correo,
            subject: 'Codigo de Verificacion',
            text: 
                "Para verificar tu cuenta, utiliza este código: " + 
                verificationCode +
                "expira en 15 minutos."
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).json({ message: 'Error' });
            }
            res
            .status(200)
            .json({message: "Cliente Registrado, vefica tu correo electronico"})
        })
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

RegistroClienteController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;

        const token = req.cookies.VerificationToken;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            correo,
            verificationCode: storedCode,
            nombre,
            apellido,
            passwordHash,
            telefono,
            estado,
            fechaRegistro,
            isVerified,
            loginAttemps,
            timeOut
        } = decoded;

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: 'Codigo de Verificacion Invalido' });
        }

        const newCliente = new ClienteModel({
            nombre,
            apellido,
            correo,
            contraseña: passwordHash,
            telefono,
            estado,
            fechaRegistro,
            isVerified,
            loginAttemps,
            timeOut
        });

        await newCliente.save();


        const cliente = await ClienteModel.findOne({ correo });
        cliente.isVerified = true;
        await cliente.save();

        res.clearCookie("VerificationToken");

        res.json({message: "Cuenta verificada correctamente"});

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: 'Error Interno Del Servidor' });
    }
}

export default RegistroClienteController;