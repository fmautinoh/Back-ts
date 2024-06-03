import Documento from "../models/Documento.model";
import { IDocumento } from "../interfaces/Documento.Interface";
import {
  handleDBError,
  handleHttpError,
  handleHttpServer,
} from "../utils/error.handle";

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

class DocumentoService {
  static async createDoc(
    asunto: string,
    num_doc: string,
    niv_acc_min: string,
    pathDoc:string,
    id_tip: number,
    id_usu: number
  ): Promise<IDocumento> {
    try {
      const documentoNuevo = await Documento.create({
        asunto,
        num_doc,
        niv_acc_min,
        pathDoc,
        id_tip,
        id_usu,
      });
      return documentoNuevo;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Error desconocido");
    }
  }

  static async UpdateDoc(
    id: number,
    newData: Partial<IDocumento>
  ): Promise<IDocumento | null> {
    try {
      const docUpdate = await Documento.findByPk(id);
      if (!docUpdate) {
        new CustomError(404, "Document not found");
      }
      await docUpdate?.update(newData);
      return docUpdate;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error updating user");
    }
  }

  static async GetDocument(): Promise<IDocumento[]> {
    try {
      const documentos = await Documento.findAll();
      if (!documentos) {
        new CustomError(404, "Error al cargar los documentos");
      }
      return documentos;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error getting documents");
    }
  }

  static async UpdateDocument(
    id: number,
    newData: Partial<IDocumento>
  ): Promise<IDocumento | null> {
    try {
      const documentos = await Documento.findByPk(id);
      if (!documentos) {
        new CustomError(404, "Error al cargar los documentos");
      }
      await documentos?.update(newData);
      return documentos;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error getting documents");
    }
  }
  static async GetDocumentId(id: number): Promise<IDocumento | null> {
    try {
      const documentos = await Documento.findByPk(id);
      if (!documentos) {
        new CustomError(404, "Error al cargar los documentos");
      }
      return documentos;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error getting documents");
    }
  }
}

export default DocumentoService;
