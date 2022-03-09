const express = require("express");
const app = express();
const clienteRouters = require("./Routes/ChatRoute");
// Porta
app.set("port", process.env.POST || 3333);

//Middlewares
app.use(express.json());

// Configuração CROS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Chama as rotas
app.use("/chat", clienteRouters);

app.use("/", (req, res) => {
  res.send("Servidor nodejs rodando!");
});

app.listen(app.get("port"), () => {
  console.log("Inicializando servidor nodejs...");
});
