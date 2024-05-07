import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  console.log("Funcion main!");
  const server = new Server({
    port: envs.PORT,
  });
  server.start();
}
