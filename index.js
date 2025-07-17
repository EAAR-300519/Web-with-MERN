const mongoose = require("mongoose");
const app = require("./app");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

const PORT = process.env.PORT || 3977;

async function conectar() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.n9tvjf9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("La conexión a la base de datos ha sido exitosa!");

    app.listen(PORT, () => {
      console.log(
        `El servidor se ha levantado en la siguiente liga: http://${IP_SERVER}:${PORT}/api/${API_VERSION}`
      );
    });
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}

conectar();
