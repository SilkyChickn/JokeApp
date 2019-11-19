import { createConnection } from 'typeorm';

export class DatabaseConnection {
    public static async connect() {
        
        console.log('Connecting to database...');
        
        return await createConnection({
            type: 'mysql',
            host: process.env.DBHOST,
            port: Number(process.env.DBPORT),
            username: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            entities: [__dirname + '../../entities/*.js'],
            synchronize: true,
            logging: false
        });
    }
}
