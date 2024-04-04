import { DataTypes } from 'sequelize';
import {sequelize} from"../utils/db.js"; 
const contact=sequelize.define("contacts",{
        username:{
            type:DataTypes.STRING,
            required:true},
        email:{
            type:DataTypes.STRING,
            required:true},
        message:{
            type:DataTypes.STRING,
            required:true},
    
})
export default contact;