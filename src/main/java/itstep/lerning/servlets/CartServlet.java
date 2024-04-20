package itstep.lerning.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import itstep.lerning.dal.dao.CartDao;
import itstep.lerning.dal.dao.ProductDao;
import itstep.lerning.models.CartPageModel;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Singleton
public class CartServlet extends HttpServlet {

    private final CartDao cartDao;
    private final ProductDao productDao;
    @Inject
    public CartServlet(CartDao cartDao, ProductDao productDao) {
        this.cartDao = cartDao;
        this.productDao = productDao;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      //  UUID userId = UUID.fromString(req.getParameter("user-id"));
        req.setAttribute("skip-container", "true");
        req.setAttribute("model", new CartPageModel(
                productDao.getList(0, 10),
                cartDao.getCart()
        ));
      //  req.setAttribute("modelOfBag", new CartPageModel(
       //         productDao.getListForBag(userId),
            /// cartDao.getCart()
        //));
        req.setAttribute("products", cartDao.getCart());

        req.setAttribute( "page-body", "cart" ) ;
        req.getRequestDispatcher("/WEB-INF/_layout.jsp").forward(req,resp);
    }


}
