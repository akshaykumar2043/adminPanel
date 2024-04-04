import { Sequelize } from "sequelize";

const sequelize = new Sequelize('PERN2024', 'postgres', 'Akshay@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: false,
    underscored: true,
       },
   });
   async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to PostgreSQL database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();
  

export { sequelize };