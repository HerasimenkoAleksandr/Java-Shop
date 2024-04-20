package itstep.lerning.models;

import itstep.lerning.dal.dto.CartItem;
import itstep.lerning.dal.dto.Product;

import java.util.List;

public class CartPageModel {
    private List<Product> products;
    private List<CartItem> cartItems;
    public List<Product> getProducts() {
        return products;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public CartPageModel(List<Product> products, List<CartItem> cartItems) {
        this.products = products;
        this.cartItems = cartItems;
    }
}