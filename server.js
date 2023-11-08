import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

import * as db from './app/models';

db.sequelize.sync().then(() => {
  console.log("Sincronizacion exitosa.");
}).catch((err) => {
  console.log("Sincronizacion fallida db: " + err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

//Referencia a Rutas
import clienteRoutes from './app/routes/cliente.routes';

clienteRoutes(app);

const PORT = process.env.PORT_SERVER;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
