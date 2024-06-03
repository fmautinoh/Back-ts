import Documento from "../models/Documento.model";
import { IDocumento } from "../interfaces/Documento.Interface";
import { handleDBError } from "../utils/error.handle";

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
    pathDoc: string,
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

  static async updateDoc(
    id: number,
    newData: Partial<IDocumento>,
    pathDoc?: string
  ): Promise<IDocumento | null> {
    try {
      const docUpdate = await Documento.findByPk(id);
      if (!docUpdate) {
        throw new CustomError(404, "Document not found");
      }
      if (pathDoc) {
        newData.pathDoc = pathDoc;
      }
      await docUpdate.update(newData);
      return docUpdate;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error updating document");
    }
  }

  static async deleteDoc(id: number): Promise<boolean> {
    try {
      const doc = await Documento.findByPk(id);
      if (!doc) {
        throw new CustomError(404, "Document not found");
      }
      await doc.destroy();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error deleting document");
    }
  }

  static async getDocById(id: number): Promise<IDocumento | null> {
    try {
      const documento = await Documento.findByPk(id);
      if (!documento) {
        throw new CustomError(404, "Document not found");
      }
      return documento;
    } catch (error) {
      if (error instanceof Error) {
        const formattedError = handleDBError(error);
        throw new Error(formattedError.error);
      }
      throw new Error("Unknown error getting document");
    }
  }

  static async getAllDocs(): Promise<IDocumento[]> {
    try {
      const documentos = await Documento.findAll();
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
