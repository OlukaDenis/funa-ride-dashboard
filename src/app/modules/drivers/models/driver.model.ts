export interface Driver {
    driverId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountState: string;
    profilePicture: string;
    engagedOn: string | null;
    comment: string | null;
    engaged: boolean | null;
    car: {
        id: number;
        vehicleName: string;
        regNo: string;
    };
    metrics: {
        countryId: number;
        ratings: number;
        debit: number;
        cancelled: number;
        totalTrips: number;
    };
    documents: {
        id: number;
        nationalIdNumber: string;
        permitExpiryDate: string;
        permitNumber: string;
        drivingLicenseImg: string;
        nationalIdImg: string;
        updatedAt: string;
    };
    countryId: number;
    deviceMetadata: any;
    passwordUpdated: boolean;
    authMethod: string;
    fcmToken: string;
    phoneNumberVerified: boolean;
    dateCreated: string;
}