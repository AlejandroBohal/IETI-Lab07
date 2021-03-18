
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI ="mongodb+srv://admon:admon@cluster0.w4aqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
    const task = event;
    let message = JSON.stringify("Error!");
    let code = 400;
    let test;
    if(typeof(task) != "undefined") {
        
        let taskBody = {
            description: task.description,
            name: task.name,
            email:task.email,
            status: task.status,
            dueDate: task.dueDate,
        }
        if (task.description != null && task.name != null && task.email != null && task.status != null && task.dueDate != null){
            message = JSON.stringify("Correct Task Body");
            code = 201;
            const db = await connectToDatabase();
            await db.collection("tasks").insertOne(taskBody);
        }
    }
    const res = {
        statusCode: code,
        body: message,
    };

    return res;
};