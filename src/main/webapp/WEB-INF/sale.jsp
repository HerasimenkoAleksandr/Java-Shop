<%@ page import="itstep.lerning.dal.dto.SaleItem" %>

<%@ page contentType="text/html;charset=UTF-8"  %>

<%
    String context = request.getContextPath() ;
    // Вилучаємо дані, передані сервлетом (контролером)
   SaleItem[] saleItems = ( SaleItem[]) request.getAttribute("sale");
%>
<%-- Відображаємо дані --%>
<% for(SaleItem item : saleItems) { %>
<div class="col s12 m7">
    <div class="card horizontal">
        <div class="card-image flex1">
            <img src="<%=context%>/img/no-image.png" alt="img" />
        </div>
        <div class="card-stacked flex3">
            <div class="card-content">
                <p><%= item.getCart().getProductId() %></p>
                <p><%= item.getCart().getCount() %></p>
            </div>
            <div class="card-content">
                <h3>Знижка на <%= item.getSale() %>%  </h3>
            </div>
        </div>
    </div>
</div>
<% } %>
