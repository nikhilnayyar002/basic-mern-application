import fs from 'fs'
import path from 'path'
import express from 'express'
import { Record404Exception } from "../config/global";
import { config } from '../config/setupEnv';


/**
 * Return @__Image
 */
export const getResume: express.RequestHandler = function (req, res, next) {
    let id = req.params.id
    return res.sendFile(path.join(__dirname, `../..${config.resume.resumeUploads}`, id), (error) => {
        if (error) return res.json({ status: false, message: "Either file not exists or try again later." })
    });
};

/**
 * Return @message
 */
export const delResume: express.RequestHandler = function (req, res, next) {
    let id = req.params.id
    fs.unlink(path.join(__dirname, `../..${config.resume.resumeUploads}`, id), (err) => {
        if (err) return next(new Record404Exception())
        else return res.json({ status: true, message: "success." })
    });
};

