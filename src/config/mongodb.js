import { MongoClient } from "mongodb";
import { env } from "./environtments";

let dbIntance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //
  await client.connect();
  // assign client DB to our dbIntance
  dbIntance = client.db(env.DATABASE_NAME);
};

export const getDB = () => {
  if (!dbIntance) {
    throw new Error("DB not connected");
  }
  return dbIntance;
};
// const listDataBase = async (client) => {
//     const databaseList = await client.db().admin().listDatabases();
//     console.log(databaseList);
//     databaseList.databases.forEach(db => {
//         console.log(db.name);
//     });
// };
