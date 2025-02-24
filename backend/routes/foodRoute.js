import express from "express";
import {addFood , removeFood , showList} from "../controller/foodAdd.js";


const Router = express.Router();

Router.post("/add/image" , addFood);
Router.post("/delete/image" , removeFood);
Router.get("/show/list" , showList);


export default Router;