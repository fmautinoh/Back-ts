import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { ICargo } from '../interfaces/Cargo.Interface';

interface CargoCreationAttributes extends Optional<ICargo, 'id_car'> {}

class Cargo extends Model<ICargo, CargoCreationAttributes> implements ICargo {
  public id_car!: number;
  public cargo!: string;
}

Cargo.init({
  id_car: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'cargos',
  timestamps: false,
});

export default Cargo;
