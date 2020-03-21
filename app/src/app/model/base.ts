export interface LRLocation {
    name : string;
    imageurl : string;
    city: string;
    street: string;
    postcode: string;
    type: LocationType;
}

export enum LocationType
{
    BAR,
    CAFE
}

export interface LocationDetail {
    ownerName: string;
    donationLink: string;
    description: string;
    lat: number;
    lng: number;
    googlePlaceId: string;
    website: string;
}

export interface Product {
    name: string;
    price: number;
    type: ProductType;
}

export enum ProductType {
    COFFEE,
    CAKE,
    BEER,
    BURGER
} 