package itstep.lerning.servlets;

import itstep.lerning.dal.dao.CartDao;
import itstep.lerning.dal.dao.SaleDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/sale")
public class SaleServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // запит даних
        SaleDao saleDao = new SaleDao();
        // передача їх до представлення (View)
        req.setAttribute( "sale", saleDao.getSale() ) ;

        req.setAttribute( "page-body", "sale" ) ;
        req.getRequestDispatcher("/WEB-INF/_layout.jsp").forward(req,resp);
    }
}

