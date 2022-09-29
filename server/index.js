app = require("./app");


const { conn } = require('../server/src/db'); 

//Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
// app.set("port", process.env.PORT || 3001); 

// app.listen(app.get("port"), () => {
//   console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
// });



