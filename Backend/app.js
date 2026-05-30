import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import MarcasRoutes from './src/Routes/Marcas.js';

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


//ENDPOINTS




export default app;