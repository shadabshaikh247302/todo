const Todo = require("../models/todo");

function todoFormatter(todo){
    try {    
        let todoList={
            today:[],
            tomorrow:[],
            previous:[]
        }
        let completed=[];
        let date=new Date();
        todo.forEach(ele => {
            if(parseInt(ele.year)>date.getFullYear()){
                todoList.tomorrow.push(ele);
            }else if(parseInt(ele.year)<date.getFullYear()){
                if(ele.completed==false){
                    todoList.previous.push(ele);
                }else{
                    completed.push(ele._id)
                }
            }else{
                if(parseInt(ele.month)>date.getMonth()){
                todoList.tomorrow.push(ele);
                }else if(parseInt(ele.month)<date.getMonth()){
                    if(ele.completed==false){
                        todoList.previous.push(ele);
                    }else{
                        completed.push(ele._id)
                    }
                }else{
                    if(parseInt(ele.day)>date.getDate()){
                        todoList.tomorrow.push(ele);
                    }else if(parseInt(ele.day)<date.getDate()){
                        if(ele.completed==false){
                            todoList.previous.push(ele);
                        }else{
                            completed.push(ele._id)
                        }
                    }else{
                        todoList.today.push(ele);
                    }
                }
            }
        });
        return {todoList,completed} 
    } catch (error) {
        console.log(error); 
    }
}

exports.addTodo=async(req,res)=>{
    try {
    
        const {userId} = req
        const tobeadded=new Todo({...req.body,creator:userId})
        const todo=await tobeadded.save();
        res.send("Todo Added");

    } catch (error) {
        console.log(error); 
    }
}

// exports.addTomorrowTodo=async(req,res)=>{
//     try {
//         const {userId} = req
//         const tobeadded=new Todo({...req.body,creator:userId})
//         const todo=await tobeadded.save();
//         res.send("Todo Added");
//     } catch (error) {
//         console.log(error);
        
//     }
// }

exports.getAllTodos=async(req,res)=>{
    try {
        
        let allTodos=await Todo.find({
            creator:req.userId
        })
        let {todoList,completed} = todoFormatter(allTodos);
        await Todo.deleteMany({
            _id:{$in:completed}
        })
        allTodos=todoList
        res.send({allTodos,msg:"Get All Todos"})
    } catch (error) {
        console.log(error); 
    }
}

exports.deleteTodo=async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.send("Deleted")
    } catch (error) {
        console.log(error);  
    }
}

exports.moveToToday=async(req,res)=>{
try {
    let date=new Date();
    await Todo.findByIdAndUpdate(req.params.id,{
        day:date.getDate(),
        month:date.getMonth(),
        year:date.getFullYear()
    })
    res.send("Moved To Today")
} catch (error) {
    console.log(error);
    
}
}

exports.markAsCompleted=async(req,res)=>{
    try {
        await Todo.findByIdAndUpdate(req.params.id,{
            completed:true
        })
        res.send("Marked As Completed")
    } catch (error) {
       console.log(error);
    }
}
