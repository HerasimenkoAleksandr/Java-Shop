package itstep.lerning.dal.dao;

import itstep.lerning.dal.dto.CartItem;

import java.util.UUID;

public class CartDao {
    public CartItem[] getCart() {
        return new CartItem[] {
                new CartItem(UUID.randomUUID(), UUID.randomUUID(), 1),
                new CartItem(UUID.randomUUID(), UUID.randomUUID(), 2),
                new CartItem(UUID.randomUUID(), UUID.randomUUID(), 3),
        };
    }
}
