import { UserModel } from "@app/core/models/user.model";

export interface DriverModel extends UserModel {
    vehicleNumber: string;
}