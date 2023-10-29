import { AppDataSource } from "../data-source";
import { Subject } from "../models/Subject";

export const SubjectRepository = AppDataSource.getRepository(Subject);