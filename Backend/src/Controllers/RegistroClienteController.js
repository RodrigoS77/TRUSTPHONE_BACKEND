import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import ClienteModel from "../Models/Clientes.js";
import { config } from "../../config.js";

const RegistroClienteController = {};

// REGISTRAR USUARIO
RegistroClienteController.registerCliente = async (req, res) => {
  const {
    nombre, 
    Apellido,
    correo,
    contraseña,
    telefono,
    estado
  } = req.body;

  try {
    // Verificar si ya existe
    const existCliente = await ClienteModel.findOne({ correo });
    
    if (existCliente) {
      return res.status(400).json({message: "El correo ya está registrado"});
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(contraseña, 10);

    // Generar código
    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Guardar usuario en base de datos como no verificado
    const newCliente = new ClienteModel({
      nombre,
      Apellido,
      correo,
      contraseña: passwordHash,
      telefono,
      estado,
      isVerified: false,
      verificationCode,
      loginAttemps: 0,
      timeOut: null
    });

    await newCliente.save();

    // Configurar correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password
      }
    });

    const mailOptions = {
      from: config.email.user_email,
      to: correo,
      subject: "Código de Verificación",
      text:"Para verificar tu cuenta utiliza este código: " +
        verificationCode +". Expira en 15 minutos."
    };

    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        console.log(error);
        return res.status(500).json({message: "Error al enviar el correo"});
      }

      return res.status(200).json({message: "Usuario registrado, verifica tu correo"});

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error interno del servidor"});
  }
};
// VERIFICAR CÓDIGO
RegistroClienteController.verifyCode = async (req, res) => {
  try {
    const { correo, verificationCodeRequest } = req.body;

    const user = await ClienteModel.findOne({ correo });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "La cuenta ya está verificada" });
    }

    // Comparar códigos
    if (!user.verificationCode || verificationCodeRequest.trim().toLowerCase() !== user.verificationCode.toLowerCase()) {
      return res.status(400).json({ message: "Código de verificación inválido" });
    }

    // Actualizar usuario
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({ message: "Cuenta verificada correctamente" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default RegistroClienteController;