import { AppDataSource } from "../data-source";
import { Video } from "../models/Video";

export const VideoRepository = AppDataSource.getRepository(Video);