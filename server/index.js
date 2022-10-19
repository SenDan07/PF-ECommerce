const app = require("./app");
const { conn } = require("./src/db");
const { User } = require("./src/db");
const bcrypt = require("bcrypt");

app.set("port", process.env.PORT || 3001);
//Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  const pass = bcrypt.hashSync("HenryGrupo08", 10);
  const userCreated = await User.create({
    name: "admin",
    isActive: true,
    lastName: "admin",
    password: pass,
    email: "grupo08pf@gmail.com",
    role: "ADMIN",
    picture: "",
    secretWord: "admin",
  });
  app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en el puerto ${app.get("port")}`); // eslint-disable-line no-console
  });
});
