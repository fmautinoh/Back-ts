import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const PATH_ROUTER = join(__dirname);
const router = Router();

const cleanFilename = (fileName: string) => {
  return fileName.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFilename(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`)
      .then((moduleRouter) => {
        if (moduleRouter.default) {
          router.use(`/${cleanName}`, moduleRouter.default);
          console.log(`Se está cargando la ruta: ${cleanName}`);
        } else {
          console.error(
            `El módulo ${cleanName} no tiene una exportación predeterminada`
          );
        }
      })
      .catch((err) => {
        console.error(`Error al cargar la ruta ${cleanName}:`, err);
      });
  }
});

export { router };
