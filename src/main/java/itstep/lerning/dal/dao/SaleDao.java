package itstep.lerning.dal.dao;

import itstep.lerning.dal.dto.CartItem;
import itstep.lerning.dal.dto.SaleItem;

import java.util.UUID;

public class SaleDao {

    CartDao carts = new CartDao();
    public SaleItem[] getSale() {
        SaleItem[] saleItems = new SaleItem[2];
        for (int i = 0; i < 2; i++) {
            saleItems[i] = new SaleItem(UUID.randomUUID(), carts.getCart()[i], 15 + i);
        }
        return saleItems;
    }
}
