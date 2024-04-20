package itstep.lerning.dal.dto;

import java.util.UUID;

public class SaleItem {
    private UUID id;
    private UUID productId;
    private int sale;

    public SaleItem(){

    }

    public SaleItem(UUID id,UUID productId, int sale ){
        this.id = id;
        this.productId = productId ;
        this.sale =sale;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }
}
