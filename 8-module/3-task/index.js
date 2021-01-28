export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = this.cartItems.find((item) => item.product.id == product.id);
    if (!cartItem) {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id == productId);
    cartItem.count += amount;
    if (cartItem.count === 0) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = 0;
    this.cartItems.forEach((item) => {
      result += item.count;
    });
    return result;
  }

  getTotalPrice() {
    let result = 0;
    this.cartItems.forEach((item) => {
      result += item.product.price * item.count;
    });
    return result;
  }

  onProductUpdate() {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
