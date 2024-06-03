import { Request, Response } from "express";
import DocumentoService from "../services/Repositorio.service";
import { CustomError, handleHttpData, handleHttpServer } from "../utils/error.handle";

const createDocController = async (req: Request, res: Response) => {
  const { asunto, num_doc, niv_acc_min, id_tip, id_usu } = req.body;
  const pathDoc = req.file?.path;

  if (!pathDoc) {
    return res.status(400).send({ error: "File is required" });
  }

  try {
    const newDoc = await DocumentoService.createDoc(asunto, num_doc, niv_acc_min, pathDoc, id_tip, id_usu);
    res.status(201).send(newDoc);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const updateDocController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const pathDoc = req.file?.path;

  try {
    const updatedDoc = await DocumentoService.updateDoc(parseInt(id), newData, pathDoc);
    if (!updatedDoc) {
      return handleHttpData(res, "Document not found");
    }
    res.status(200).send(updatedDoc);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const deleteDocController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const success = await DocumentoService.deleteDoc(parseInt(id));
    if (!success) {
      return handleHttpData(res, "Document not found");
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const getDocByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const doc = await DocumentoService.getDocById(parseInt(id));
    if (!doc) {
      return handleHttpData(res, "Document not found");
    }
    res.status(200).send(doc);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const getAllDocsController = async (req: Request, res: Response) => {
  try {
    const docs = await DocumentoService.getAllDocs();
    res.status(200).send(docs);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

export {
  createDocController,
  updateDocController,
  deleteDocController,
  getDocByIdController,
  getAllDocsController
};
