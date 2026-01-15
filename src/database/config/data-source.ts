import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('Connecting with user:', process.env.DB_USER); // See if this prints 'postgres' or 'undefined'
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  migrationsTableName: 'migrations',
  synchronize: false,
  migrations: [
    __dirname + '/../migrations/**/*.ts'
  ],
  subscribers: [],
  schema: 'public'
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;