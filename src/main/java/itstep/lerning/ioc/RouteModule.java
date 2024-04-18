package itstep.lerning.ioc;
import com.google.inject.servlet.ServletModule;
import itstep.lerning.filters.CharsetFilter;
import itstep.lerning.servlets.*;


public class RouteModule extends ServletModule {
    @Override
    protected void configureServlets() {
        filter( "/*" ).through( CharsetFilter.class ) ;
        serve("/").with(HomeServlet.class);
        serve("/cart").with(CartServlet.class);
        serve( "/auth"   ).with( AuthServlet.class   ) ;
        serve("/sale").with(SaleServlet.class);
        serve( "/shop"   ).with( ShopServlet.class   ) ;
        serve("/signup").with(itstep.lerning.servlets.SignupServlet.class);
        serve( "/shop-api").with( ShopApiServlet.class ) ;
       // serve("/product").with(ProductServlet.class);
    }
}
