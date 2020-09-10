import mongoose from "mongoose";

/** Typescript Modal  */
export interface Application {
    name: string;
    email: string;
    country: string;
    resume: string;
    date:string;
}


/** Mongoose Schema */
export const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name can't be empty"
    },
    email: {
        type: String,
        required: "Email can't be empty",
        unique: true
    },
    country: String,
    resume: String,
    date:Date
});


/**
 * Validate @email path
 */
ApplicationSchema.path("email").validate(val => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, "Invalid e-mail.");


/** Mongoose Modal  */
export const ApplicationModal = mongoose.model<Application & mongoose.Document>("Application", ApplicationSchema);