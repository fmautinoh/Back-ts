import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { ITipoDocumento } from '../interfaces/TipoDocumento.Interface';

interface TipoDocumentoCreationAttributes extends Optional<ITipoDocumento, 'id_tip'> {}

class TipoDocumento extends Model<ITipoDocumento, TipoDocumentoCreationAttributes> implements ITipoDocumento {
  public id_tip!: number;
  public tipo!: string;
}

TipoDocumento.init({
  id_tip: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'tipo_documentos',
  timestamps: false,
});

export default TipoDocumento;
