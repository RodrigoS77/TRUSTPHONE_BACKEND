import {Schema, model} from 'mongoose';

const ClientesSchema = new Schema({
    nombre: {
        type: String
    },
    Apellido: {
        type: String
    },
    correo: {
        type: String
    },
    contraseña: {
        type: String
    },
    telefono: {
        type: String
    },
    estado: {
        type: String
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
},{
    timestamps: true,
    strict: false
})

export default model('Clientes', ClientesSchema)