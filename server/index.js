const app = require("./app");
const { conn }=require('./src/db')
//Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});