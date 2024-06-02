import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IPersona } from '../interfaces/Persona.interface';

interface PersonaCreationAttributes extends Optional<IPersona, 'dni'> {}

class Persona extends Model<IPersona, PersonaCreationAttributes> implements IPersona {
  public dni!: number;
  public nom_per!: string;
  public pri_ape!: string;
  public seg_ape!: string;
}

Persona.init({
  dni: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nom_per: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  pri_ape: {
    type: DataTypes.STRING(65),
    allowNull: false,
  },
  seg_ape: {
    type: DataTypes.STRING(65),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'personas',
  timestamps: false,
});

export default Persona;
