import mongoose from 'mongoose';
import multer from 'multer';
import { config } from "./setupEnv";
import fs from 'fs'
import path from 'path'
import express from 'express';
import { ApplicationModal, Application } from '../modal/application'


export class HttpException extends Error {
  status: number;
  message: string;
  constructor(message: string = null, status: number = 500) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export class Record404Exception extends HttpException {
  constructor() {
    super("Record not found", 404);
  }
}

export function returnTyped<T>(data: any): T {
  return data as T;
}

/** mongoose result to _doc */
export function simplifyMongoose<T>(data: any): T {
  if (data.length) return data.map(e => e._doc);
  return data._doc;
}

// ***************************  Image upload support

// I have found that these runs in order: fileFilter then destination then filename

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = path.join(__dirname, `../..${config.resume.resumeUploads}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(
      null,
      dir
    );
  },
  filename: function (req: express.Request, file, cb) {
    let app: Application = req.body;
    app.resume = mongoose.Types.ObjectId().toHexString().toString() + file.originalname.replace(/\s/g, "_")
    ApplicationModal.create(app, function (err, apps) {
      if (err) {
        cb(err, app.resume);
      } else {
        cb(null, app.resume);
      }
    });

  }
});

export const resumeUpload = multer({
  storage: storage,
  limits: {
    fileSize: config.resume.resumeUploadSize,
    files: 1 // 1 file
  },
  fileFilter: (req, file, cb) => {
    // if the file extension is in our accepted list
    let FILELISTS = config.resume.files
    let exts = Object.keys(FILELISTS)

    for (let ext of exts) {
      if (file.originalname.endsWith("." + ext) && file.mimetype == FILELISTS[ext]) {
        return cb(null, true);
      }
    }

    // otherwise, return error
    return cb(
      new Error("Only " + exts.join(", ") + " files are allowed!")
    );
  }
}).single(config.resume.resumeFormDataName);