export default interface Product {
    id: number,
    title: string,
    price: number,
    created_at: Date,
    updated_at: Date,
    published_at: Date | undefined,
}