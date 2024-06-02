import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IUsuario } from '../interfaces/Usuario.interface';
import Persona from './Persona.model';
import Cargo from './Cargo.model';

interface UsuarioCreationAttributes extends Optional<IUsuario, 'id_usu'> {}

class Usuario extends Model<IUsuario, UsuarioCreationAttributes> implements IUsuario {
  public id_usu!: number;
  public username!: string;
  public pasword!: string;
  public dni!: number;
  public id_car!: number;
}

Usuario.init({
  id_usu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  pasword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Persona,
      key: 'dni',
    },
  },
  id_car: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cargo,
      key: 'id_car',
    },
  },
}, {
  sequelize,
  tableName: 'usuarios',
  timestamps: false,
});

Usuario.belongsTo(Persona, { foreignKey: 'dni' });
Usuario.belongsTo(Cargo, { foreignKey: 'id_car' });

export default Usuario;
