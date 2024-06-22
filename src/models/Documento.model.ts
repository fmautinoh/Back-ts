import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IDocumento } from '../interfaces/Documento.Interface';
import Usuario from './Usuario.model';
import TipoDocumento from './TipoDocumento.model';

interface DocumentoCreationAttributes extends Optional<IDocumento, 'id_doc'> {}

class Documento extends Model<IDocumento, DocumentoCreationAttributes> implements IDocumento {
  public id_doc!: number;
  public asunto?: string;
  public num_doc?: string;
  public niv_acc_min?: number;
  public pathDoc?: string;
  public id_tip!: number;
  public id_usu!: number;
}

Documento.init({
  id_doc: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  asunto: {
    type: DataTypes.TEXT,
  },
  num_doc: {
    type: DataTypes.STRING(10),
  },
  niv_acc_min: {
    type: DataTypes.INTEGER,
  },
  pathDoc: {
    type: DataTypes.TEXT,
  },
  id_tip: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoDocumento,
      key: 'id_tip',
    },
  },
  id_usu: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id_usu',
    },
  },
}, {
  sequelize,
  tableName: 'documentos',
  timestamps: false,
});

Documento.belongsTo(TipoDocumento, { foreignKey: 'id_tip' });
Documento.belongsTo(Usuario, { foreignKey: 'id_usu' });

export default Documento;
