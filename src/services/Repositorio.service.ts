import Documento from "../models/Documento.model";
import { IDocumento } from "../interfaces/Documento.Interface";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";

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
    niv_acc_min: number,
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

      const updatedData: Partial<IDocumento> = {};

      // Actualizar campo 'asunto' si está definido en newData
      if (newData.asunto !== undefined) {
        updatedData.asunto = newData.asunto;
      } else {
        updatedData.asunto = docUpdate.asunto;
      }

      // Actualizar campo 'num_doc' si está definido en newData
      if (newData.num_doc !== undefined) {
        updatedData.num_doc = newData.num_doc;
      } else {
        updatedData.num_doc = docUpdate.num_doc;
      }

      // Actualizar campo 'niv_acc_min' si está definido en newData
      if (newData.niv_acc_min !== undefined) {
        updatedData.niv_acc_min = newData.niv_acc_min;
      } else {
        updatedData.niv_acc_min = docUpdate.niv_acc_min;
      }

      // Actualizar campo 'pathDoc' si está definido en newData
      if (newData.pathDoc !== undefined) {
        updatedData.pathDoc = newData.pathDoc;
      } else {
        updatedData.pathDoc = docUpdate.pathDoc;
      }

      // Actualizar campos fijos
      updatedData.id_tip = newData.id_tip ?? docUpdate.id_tip;
      updatedData.id_usu = newData.id_usu ?? docUpdate.id_usu;

      console.log("Datos antes de actualizar:", updatedData);

      // Aplicar las actualizaciones al documento encontrado
      const update = await docUpdate.update(updatedData);

      return update;
    } catch (error) {
      throw error; // Re-throw the error for proper handling in the controller
    }
  }

  static async deleteDoc(id: number): Promise<boolean> {
    try {
      const doc = await Documento.findByPk(id);
      const filePath = doc?.pathDoc;
      if (!doc) {
        throw new CustomError(404, "Document not found");
      }
      await doc.destroy();
      if (filePath) {
        fs.unlinkSync(path.resolve(filePath));
      }
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
  static async getAllDocsPaginated(
    page: number,
    pageSize: number,
    nivacc: string
  ): Promise<{ docs: IDocumento[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;
      const { count, rows } = await Documento.findAndCountAll({
        where: {
          niv_acc_min: {
            [Op.lte]: nivacc, // Asegúrate de usar el operador lte (less than or equal)
          },
        },
        offset: offset,
        limit: pageSize,
      });
      return { docs: rows, total: count };
    } catch (error) {
      throw new CustomError(500, "Error fetching documents");
    }
  }

  static async getDocFileById(
    id: number
  ): Promise<{ filePath: string; fileName: string }> {
    try {
      const doc = await Documento.findByPk(id);
      if (!doc) {
        throw new CustomError(404, "Document not found");
      }

      const filePath = doc.pathDoc;
      if (!filePath) {
        throw new CustomError(404, "Document file not found");
      }

      // Verify if the file exists
      if (!fs.existsSync(filePath)) {
        throw new CustomError(
          404,
          "Document file does not exist on the server"
        );
      }

      const fileName = path.basename(filePath);
      return { filePath, fileName };
    } catch (error) {
      throw new CustomError(500, "Error fetching document file");
    }
  }
}

export default DocumentoService;
