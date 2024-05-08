import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    // Midelware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Public Folder
    this.app.use(express.static("public"));

    // Routes
    this.app.use(this.routes);

    // SPA WebServer
    this.app.get("*", (req, res) => {
      const indexPath = path.join(__dirname + "../../../public/index.html");
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
