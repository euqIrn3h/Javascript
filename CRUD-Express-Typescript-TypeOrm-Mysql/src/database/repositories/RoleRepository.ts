import { AppDataSource } from "../data-source";
import { Role } from "../models/Role";

export const RoleRepository = AppDataSource.getRepository(Role);