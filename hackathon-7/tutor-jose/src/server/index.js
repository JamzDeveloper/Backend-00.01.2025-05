const { default: axios } = require("axios");
const express = require("express");

class Server {
  originPath = "/api";
  githubPath = "/github";

  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();

    this.routes();

    this.middleware();

    this.dbConnection();
  }

  routes() {
    this.app.get(`${this.originPath}`, (req, res) => {
      res.send("Hello World!");
    });

    // Api Github

    this.app.get(
      //api/github/jamzdeveloper
      `${this.originPath}${this.githubPath}/:username`,
      async (req, res) => {
        const params = req.params;
        console.log("params", params);

        if (!params.username.trim()) {
          // validamos que no envieen datos vacios
          return res.status(400).json({
            errors: {
              message: "se necesita el nombre de usuario",
              code: 400,
            },
          });
        }

        const result = await axios.get(
          `https://api.github.com/users/${params.username}`
        );
        console.log("result api", result.data);

        res.json({
          success: true,
          data: result.data,
        });
      }
    );
  }

  middleware() {}

  dbConnection() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

module.exports = {
  Server,
};
