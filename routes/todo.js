const express=require("express");
const { authenticator } = require("../middlewares/authenticator");
const { addTodo, getAllTodos, deleteTodo, moveToToday, markAsCompleted } = require("../controllers/todo");
const todoRouter=express.Router();

todoRouter.post("/addTodo",authenticator,addTodo);
todoRouter.get("/getAllTodo",authenticator,getAllTodos);
todoRouter.delete("/deleteTodo/:id",authenticator,deleteTodo);
todoRouter.put("/moveToToday/:id",authenticator,moveToToday);
todoRouter.put("/markAsCompleted/:id",authenticator,markAsCompleted);

module.exports=todoRouter;
