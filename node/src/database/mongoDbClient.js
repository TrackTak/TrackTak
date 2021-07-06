import { default as MongoDb } from "mongodb";

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const URI = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=1;authSource=admin`;

const client = new MongoDb.MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connect = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");
  } catch (err) {
    throw err;
  }
};

export const createCollection = (collection) => {
  const database = client.db(DATABASE_NAME);
  database.createCollection(collection, function (err, res) {
    if (err) throw err;
    console.log(`Collection ${collection} created!`, res);
  });
};

export const insert = async (collection, document) => {
  const database = client.db(DATABASE_NAME);
  const response = await database.collection(collection).insertOne(document);

  if (response.result.ok) {
    return response.ops[0];
  } else {
    throw Error("Error inserting document");
  }
};

export const replace = async (collection, query, document) => {
  const database = client.db(DATABASE_NAME);
  const response = await database
    .collection(collection)
    .replaceOne(query, document, { upsert: true });

  if (response.result.ok) {
    return response.ops[0];
  } else {
    throw Error("Error replacing document");
  }
};

export const find = async (collection, query = {}) => {
  const database = client.db(DATABASE_NAME);
  return database.collection(collection).find(query).toArray();
};

export const deleteOne = async (collection, id, userId) => {
  const database = client.db(DATABASE_NAME);
  const response = await database.collection(collection).deleteOne({
    _id: new MongoDb.ObjectId(id),
    userId,
  });

  if (response.result.ok) {
    return response.deletedCount;
  } else {
    throw Error(`Error deleting document ${id}`);
  }
};
