import fs from "fs";
import path from "path";
import express from "express";
import { Application, ApplicationModal } from "../modal/application";
import { Record404Exception, resumeUpload } from "../config/global";
import { config } from "../config/setupEnv";

/**
 * Return @message
 */
export const register: express.RequestHandler = (req, res, next) => {

    resumeUpload(req, res, function (err) {
        if (!err) {
            if (req.file) {
                return res.json({ status: true, message: "success" });
            } else {
                return res.status(422).json({ status: false, message: 'File not uploaded' });
            }
        }
        else {
            if (err.code == 11000)
                return res.status(422).json({
                    status: false,
                    message: 'Duplicate email adrress found.'
                });
            else return next(err);
        }
    })
}


/**
 * Return @Applications
 */
export const getAllApplications: express.RequestHandler = function (req, res, next) {
    ApplicationModal.find({}, (err, apps: Application[]) => {
        if (err) return next(err);
        if (apps && apps.length) return res.json({ status: true, apps });
        else return next(new Record404Exception());
    }).sort({ date: "desc" });
};



/**
 * Return @message
 */
export const deleteApplication: express.RequestHandler = (req, res, next) => {
    let app: Application = req.body

    ApplicationModal.deleteOne({ email: app.email })
        .exec()
        .then(() => {
            fs.unlink(path.join(__dirname, `../..${config.resume.resumeUploads}`, app.resume), (err) => {
                // if (err) return next(new Record404Exception())
                // else return res.json({ status: true, message: "success." })
                res.json({ status: true, message: "Success" })
            });
        })
        .catch(() => res.status(422).json({ status: false, message: "Failed" }));
}
