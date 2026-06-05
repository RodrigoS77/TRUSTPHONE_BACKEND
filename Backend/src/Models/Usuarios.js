import { Schema, model } from 'mongoose';

const UsuariosSchema = new Schema({
    nombre: {
        type: String,
    },
    email: {
        type: String,
    },
    contraseña: {
        type: String,
    },
    rol: {
        type: String,
    },
    estado: {
        type: String,
    },  
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
    },
    loginAttemps: {
        type: Number,
    },
    timeOut: {
        type: Date,
    }
}, {
    timestamps: true,
    strict: false
});

export default model('Usuarios', UsuariosSchema);
