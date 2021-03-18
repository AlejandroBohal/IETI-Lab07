const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb+srv://admon:admon@cluster0.w4aqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("myFirstDatabase");
  cachedDb = db;
  return db;
}
exports.handler = async (event) => {

    const db = await connectToDatabase();
    const taskList = await db.collection("tasks").find({}).toArray();
    
    const responseMessage = { tasks: taskList};

    const response = {
        status: 200,
        body: responseMessage,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return response;
}