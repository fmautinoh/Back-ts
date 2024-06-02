import sequelize from '../conf/database';
import Persona from '../models/Persona.model';
import Cargo from '../models/Cargo.model';
import Usuario from '../models/Usuario.model';
import TipoDocumento from '../models/TipoDocumento.model';
import Documento from '../models/Documento.model';

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true }); // This will drop the tables if they already exist and recreate them
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDb();
