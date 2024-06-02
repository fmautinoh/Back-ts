import { Request, Response } from "express";
import { CustomError, handleHttpData, handleHttpServer } from "../utils/error.handle";
import DocumentoService from "../services/Repositorio.service";


const updateDocContres = async (req: Request ,res:Response, statusCode: number) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedDoc = await DocumentoService.UpdateDoc(parseInt(id), newData);
    if (!updatedDoc) {
      return handleHttpData(res,"Document no Encontrado");
    }
    res.status(200).send(updatedDoc);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

export default {updateDocContres}
