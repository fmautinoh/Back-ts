import { Request, Response } from "express";
import DocumentoService from "../services/Repositorio.service";
import {
  CustomError,
  handleHttpData,
  handleHttpServer,
} from "../utils/error.handle";
import { RequestExt } from "../interfaces/req-ext";

const createDocController = async (req: Request, res: Response) => {
  const { asunto, num_doc, niv_acc_min, id_tip, id_usu } = req.body;
  const pathDoc = req.file?.path || "";

  const data = {
    asunto,
    num_doc,
    niv_acc_min,
    pathDoc,
    id_tip,
    id_usu,
  };

  if (!pathDoc) {
    return res.status(400).send({ error: "File is required" });
  }

  try {
    const newDoc = await DocumentoService.createDoc(
      data.asunto,
      data.num_doc,
      data.niv_acc_min,
      data.pathDoc,
      data.id_tip,
      data.id_usu
    );

    const respuesta = {
      id_doc: newDoc.id_doc,
      asunto: newDoc.asunto,
      num_doc: newDoc.num_doc,
      //niv_acc_min: newDoc.niv_acc_min,
      id_tip: newDoc.id_tip,
    };

    res.status(201).send(respuesta);
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
    const updatedDoc = await DocumentoService.updateDoc(
      parseInt(id),
      newData,
      pathDoc
    );
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

const getDocByIdController = async (req: RequestExt, res: Response) => {
  const { id } = req.params;

  try {
    const doc = await DocumentoService.getDocById(parseInt(id));
    if (!doc) {
      return handleHttpData(res, "Document not found");
    }
    // Filtrar según nivel de acceso
    const docNivAccMin = doc.niv_acc_min ?? 0;
    if (req.user?.id_car < docNivAccMin) {
      return res.status(403).send("Access denied");
    }
    res.status(200).send(doc);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const Pagination = async (req: RequestExt, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 6;
  const nivacc = req.user?.id_car;

  try {
    const { docs, total } = await DocumentoService.getAllDocsPaginated(
      page,
      pageSize,
      nivacc
    );
    const totalPages = Math.ceil(total / pageSize);

    // Filtrar los documentos según el nivel de acceso
    const filteredDocs = docs
      .filter((doc: any) => req.user?.id_car >= (doc.niv_acc_min ?? 0))
      .map((doc: any) => ({
        id_doc: doc.id_doc,
        asunto: doc.asunto,
        num_doc: doc.num_doc,
        niv_acc_min: doc.niv_acc_min,
        id_tip:doc.id_tip,
      }));

    res.status(200).send({
      docs: filteredDocs,
      currentPage: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalDocs: total,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const getAllDocsController = async (req: RequestExt, res: Response) => {
  try {
    const docs = await DocumentoService.getAllDocs();
    // Filtrar los documentos según el nivel de acceso
    const filteredDocs = docs.filter(
      (doc) => req.user?.id_car >= (doc.niv_acc_min ?? 0)
    );
    res.status(200).send(filteredDocs);
  } catch (error) {
    if (error instanceof CustomError) {
      return handleHttpData(res, error.message);
    }
    return handleHttpServer(res, "Internal server error");
  }
};

const getDocFileController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const { filePath, fileName } = await DocumentoService.getDocFileById(parseInt(id));
    res.download(filePath, fileName);
  } catch (error) {
    if (error instanceof CustomError) {
      handleHttpData(res, error.message);
    } else {
      handleHttpServer(res, "Internal server error");
    }
  }
};

export {
  createDocController,
  updateDocController,
  deleteDocController,
  getDocByIdController,
  getAllDocsController,
  Pagination,
  getDocFileController,
};
