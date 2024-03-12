package itstep.lerning.dal.dto;

import java.util.UUID;

public class SaleItem {
    private UUID id;
    private CartItem cart;
    private int sale;

    public SaleItem(){

    }

    public SaleItem(UUID id,CartItem cart, int sale ){
        this.id = id;
        this.cart = cart ;
        this.sale =sale;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public CartItem getCart() {
        return cart;
    }

    public void setCart(CartItem cart) {
        this.cart = cart;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }
}
