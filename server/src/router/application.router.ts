import express from 'express';
import { register, getAllApplications, deleteApplication } from '../controllers/application.controller';

let router:express.Router = express.Router();


router.post('/register',register);
router.get('/all', getAllApplications);
router.post('/delete', deleteApplication);



export const applicationRouter = router;