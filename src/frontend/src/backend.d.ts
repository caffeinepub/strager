import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    displayName: string;
    email: string;
    isSeller: boolean;
}
export interface ProductInput {
    categoryId: number;
    name: string;
    description: string;
    stock: number;
    imageUrl: string;
    priceCents: number;
}
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    name: string;
    zipCode: string;
    state: string;
    phoneNumber: string;
}
export interface CartItem {
    productId: number;
    quantity: number;
}
export interface Order {
    id: number;
    status: Variant_shipped_created_cancelled_delivered;
    totalCents: number;
    shippingAddress: ShippingAddress;
    buyer: Principal;
    items: Array<CartItem>;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    seller: Principal;
    isActive: boolean;
    stock: number;
    imageUrl: string;
    category: Category;
    priceCents: number;
}
export interface Category {
    id: number;
    name: string;
    iconUrl: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_shipped_created_cancelled_delivered {
    shipped = "shipped",
    created = "created",
    cancelled = "cancelled",
    delivered = "delivered"
}
export interface backendInterface {
    addToCart(productId: number, quantity: number): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createOrder(cartItems: Array<CartItem>, shippingAddress: ShippingAddress): Promise<Order>;
    createProduct(productInput: ProductInput): Promise<Product>;
    deactivateProduct(productId: number): Promise<void>;
    getAllActiveProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getCategories(): Promise<Array<Category>>;
    getOrder(orderId: number): Promise<Order>;
    getOrderHistory(): Promise<Array<Order>>;
    getProduct(id: number): Promise<Product>;
    getProductsByCategory(categoryId: number): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCartItem(productId: number, quantity: number): Promise<void>;
    updateProduct(productId: number, productInput: ProductInput): Promise<Product>;
}
