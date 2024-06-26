package itstep.lerning.ioc;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class IocContextListener extends GuiceServletContextListener {
    @Override
    protected Injector getInjector() {
        return Guice.createInjector(
        new ServiceModule(),
        new RouteModule());
    }
}
