
export class ShoppingCartItem {

    constructor(init?:Partial<ShoppingCartItem>) {
        Object.assign(this,init);
     }

    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    get totalPrice() {
        return this.price * this.quantity;
    }
}