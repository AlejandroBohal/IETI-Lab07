exports.handler = async (event) => {

    var taskList = [
        {description: "some desc", name: "Alejandro Bohórquez", email: "sergiobohal@gmail.com", status:"ready", dueDate: "01/01/2021"}
    ];
    
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