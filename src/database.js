import MongoClient from 'mongodb';

export const connect = async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.DB_NAME);
    console.log('DB is connected');
    return db;
  } catch (err) {
    console.error(err);
  }
}
