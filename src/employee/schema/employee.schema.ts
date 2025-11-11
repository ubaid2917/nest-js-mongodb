import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  {Document, Types, Schema as MongooseSchema } from "mongoose";  
import {Profile} from './profile.schema'

@Schema()
export class Employee extends Document {
    @Prop()
    name: string;

    @Prop({ type : Types.ObjectId, ref: 'Profile' })
    profile: Profile;

}   

export const EmployeeSchema = SchemaFactory.createForClass(Employee);