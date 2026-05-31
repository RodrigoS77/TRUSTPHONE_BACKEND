import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import MarcasRoutes from './src/Routes/Marcas.js';
import CelularesRoutes from './src/Routes/Celulares.js';
import ClientesRouter from "./src/Routes/Clientes.js"
import RegistroClientes from "./src/Routes/RegistroCliente.js"
import loginClienteController from './src/Routes/LoginClientes.js';
import LogOutController from './src/Routes/LogOut.js';


const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());

//ENDPOINTS
app.use('/api/marcas', MarcasRoutes);
app.use('/api/celulares', CelularesRoutes);
app.use('/api/clientes', ClientesRouter);
app.use('/api/registroClientes', RegistroClientes);
app.use('/api/loginClientes', loginClienteController);
app.use('/api/logout', LogOutController);


export default app;