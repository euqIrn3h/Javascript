import { AppDataSource } from "../data-source";
import { Room } from "../models/Room";

export const RoomRepository = AppDataSource.getRepository(Room);