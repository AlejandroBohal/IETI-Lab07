exports.handler = async (event) => {
    
    const task = event;
    let message = JSON.stringify("Error!");
    let code = 400;
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
        }
    }
    
    const res = {
        statusCode: code,
        body: message,
    };
    return res;

};