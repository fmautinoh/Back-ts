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
      throw new CustomError(500, "Error creating document");
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
      throw new CustomError(500, "Error updating document");
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
      throw new CustomError(500, "Error deleting document");
    }
  }

  static async getDocById(id: number): Promise<IDocumento | null> {
    try {
      const doc = await Documento.findByPk(id);
      if (!doc) {
        throw new CustomError(404, "Document not found");
      }
      return doc;
    } catch (error) {
      throw new CustomError(500, "Error fetching document");
    }
  }

  static async getAllDocs(): Promise<IDocumento[]> {
    try {
      const docs = await Documento.findAll();
      return docs;
    } catch (error) {
      throw new CustomError(500, "Error fetching documents");
    }
  }
}

export default DocumentoService;
