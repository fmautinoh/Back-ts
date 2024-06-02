import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFilename = (fileName: string) => {
  const file = fileName.split(".").shift();

  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFilename(fileName);
  if (cleanName != "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
      console.log(`se esta cargando la ruta.....${cleanName}`)
    });
    //console.log(cleanName);
  }
});

export { router };
