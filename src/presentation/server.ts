import express from "express";
import path from "path";

interface Options {
  port: number;
}

export class Server {
  private app = express();
  private readonly port: number;

  constructor(options: Options) {
    this.port = options.port;
  }

  async start() {
    // midelware

    // public folder
    this.app.use(express.static("public"));

    this.app.get("*", (req, res) => {
      const indexPath = path.join(__dirname + "../../../public/index.html");
      res.sendFile(indexPath);
    });

    this.app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
