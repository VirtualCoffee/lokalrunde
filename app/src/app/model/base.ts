export interface LRLocation {
    id: string;
    name: string;
    imageUrl: string;
    city: string;
    street: string;
    zipCode: string;
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
    id?: string
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