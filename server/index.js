const app = require("./app");
const { conn } = require("./src/db");

app.set("port", process.env.PORT || 3001);
//Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en el puerto ${app.get("port")}`); // eslint-disable-line no-console
  });
});
