package itstep.lerning.ioc;
import com.google.inject.servlet.ServletModule;
import itstep.lerning.servlets.*;


public class RouteModule extends ServletModule {
    @Override
    protected void configureServlets() {
        serve("/").with(HomeServlet.class);
        serve("/cart").with(CartServlet.class);
        serve( "/auth"   ).with( AuthServlet.class   ) ;
        serve("/sale").with(SaleServlet.class);

        serve("/signup").with(itstep.lerning.servlets.SignupServlet.class);
        serve("/product").with(ProductServlet.class);
    }
}
