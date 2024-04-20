package itstep.lerning.dal.dao;

import itstep.lerning.dal.dto.CartItem;
import itstep.lerning.dal.dto.SaleItem;

import java.util.UUID;

public class SaleDao {

       public SaleItem[] getSale() {
        return new SaleItem[] {
                new SaleItem(UUID.randomUUID(), UUID.randomUUID(), 1),
                new SaleItem(UUID.randomUUID(), UUID.randomUUID(), 2),
                new SaleItem(UUID.randomUUID(), UUID.randomUUID(), 3),
        };
    }
}
