import { Response } from "express";

const handleHttpData = (res: Response, error: string) => {
  res.status(400).send({ error });
};

const handleHttpServer = (res: Response, error: string) => {
  res.status(500).send({ error });
};

const handleDBError = (error: Error): { error: string } => {
  if (error instanceof Error) {
    return { error: error.message };
  } else {
    return { error: "Unknown database error" };
  }
};


export { handleHttpData, handleHttpServer,handleDBError };
