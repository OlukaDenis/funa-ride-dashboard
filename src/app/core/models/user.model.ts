export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dateCreated: string;
    isActive: boolean | null;
    isVerified: boolean | null;
    accountState: boolean | null;
}

export interface UserResponse {
    content: User[];
    pageable: {
        sort: {
            unsorted: boolean;
            sorted: boolean;
            empty: boolean;
        };
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    sort: {
        unsorted: boolean;
        sorted: boolean;
        empty: boolean;
    };
    first: boolean;
    size: number;
    number: number;
    empty: boolean;
}