export type RestaurantInfo = {
    id: string,
    name: string,
    price: string,
    rating: number,
    review_count: number,
    image_url: string
}

export type RestaurantDetailedInfo = {
    name: string,
    photos: string[]
}