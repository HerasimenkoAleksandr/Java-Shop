package itstep.lerning.ioc;
import com.google.inject.AbstractModule;

import itstep.lerning.services.db.DbService;
import itstep.lerning.services.db.MySqlDbService;
import itstep.lerning.services.form.FormParseService;
import itstep.lerning.services.form.HybridFormParser;
import itstep.lerning.services.hash.HashService;
import itstep.lerning.services.hash.Md5HashService;
import itstep.lerning.services.kdf.HashKdfService;
import itstep.lerning.services.kdf.KdfService;

public class ServiceModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(HashService.class).to(Md5HashService.class);
        bind(DbService.class).to(MySqlDbService.class);
        bind(FormParseService.class).to(HybridFormParser.class);
        bind(KdfService.class).to(HashKdfService.class);
    }
}
