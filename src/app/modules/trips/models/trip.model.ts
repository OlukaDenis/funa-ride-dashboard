interface PassengerModel {
    cost: number;
    name: string;
    phone: string;
    seats: number;
    token: string;
    user_id: number;
}

interface PassengersModel {
    passengers: PassengerModel[];
}

export interface TripModel {
    state: string;
    routeId: number;
    driverId: number;
    passengers: PassengersModel;
    vehicleName: string;
    countryId: number;
    currency: string;
    costPerHead: number;
    originAddress: string;
    destinationAddress: string;
    journeyType: string;
    driverEmail: string;
    regNumber: string;
    driverProfilePic: string;
    driverFirstName: string;
    driverLastName: string;
    driverCompletedTrips: number;
    driverPhoneNumber: string;
    driverRating: number;
    departureTimestamp: string;
    startTimestamp: string | null;
    endTimestamp: string | null;
    maxPassengers: number;
}

