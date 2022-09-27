app = require("./app");

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
});
