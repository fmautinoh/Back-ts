import { Response } from "express";

const handleHttpError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).send({ error: message });
};

const handleHttpData = (res: Response, error: string) => {
  handleHttpError(res, 400, error);
};

const handleHttpServer = (res: Response, error: string) => {
  handleHttpError(res, 500, error);
};

const handleDBError = (error: Error): { error: string } => {
  if (error instanceof Error) {
    return { error: error.message };
  } else {
    return { error: "Unknown database error" };
  }
};
class CustomError extends Error {
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { handleHttpData, handleHttpServer,handleDBError,handleHttpError, CustomError };
