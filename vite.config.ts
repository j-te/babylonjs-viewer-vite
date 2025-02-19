import { defineConfig } from "vite";
import { readFileSync, writeFileSync } from "node:fs";
//import { relative, resolve } from "node:path";
import * as buildInfo from "./build-info.json";

// https://vitejs.dev/config/

function makeBold(text: string) {
  return `\x1B[1m${text}\x1B[22m`;
}

export default defineConfig(({ command, mode }) => {
  console.log(
    `╒═══════════   ${makeBold("BabylonJS Vite Examples")}   ═══════════╕`,
  );
  console.log(`| Last build: ${buildInfo.lastBuildTime}                  |`);
  console.log("|                                                   |");
  console.log("| Landing page:                                     |");
  console.log("|   http://localhost:1337/                          |");
  console.log("| Examples:                                         |");
  console.log("|   http://localhost:1337/web-component/            |");
  console.log("|   http://localhost:1337/web-component-working/    |");
  console.log("╘═══════════════════════════════════════════════════╛");
  return {
    base: "",
    server: {
      port: 1337,
      open: "",
    },
    plugins: [
      {
        name: "build-script",
        buildStart() {
          console.log(command);
          if (command === "build") {
            writeFileSync(
              "build-info.json",
              JSON.stringify({
                lastBuildTime: new Date().toLocaleString(),
              }),
              { flag: "w" },
            );
          }
        },
      },
    ],
  };
});
