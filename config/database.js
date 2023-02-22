const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    // @Note: Moved to Server.js (Handle rejection outside express)
    // .catch((err) => {
    //   console.error(`Database Error: ${err}`);
    //   process.exit(1);
    // });
};

module.exports = dbConnection;
