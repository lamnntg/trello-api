import { MongoClient } from 'mongodb';
import { env } from './environtments';

const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const connectDB = async () => {
    try {
        //
        await client.connect();
        //
        await listDataBase(client);
        console.log('connect successfully');
    } finally {
        await client.close();
    }
};

const listDataBase = async (client) => {
    const databaseList = await client.db().admin().listDatabases();
    console.log(databaseList);
    databaseList.databases.forEach(db => {
        console.log(db.name);
    });
};
