import { DataSourceOptions } from 'typeorm';


const ormConfig: DataSourceOptions = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'OrganizeHub',
    type: 'mysql',
    logging: ['error'],
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false,
    
};

export default ormConfig;