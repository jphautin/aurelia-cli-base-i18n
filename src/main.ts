import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import * as Backend from 'i18next-xhr-backend';


//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }


  //register the plugin
  aurelia.use.plugin('aurelia-i18n', (instance) => {
    // register backend plugin
    instance.i18next.use(Backend);

    return instance.setup({
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json',
      },
      lng : 'fr',
      attributes : ['t','i18n'],
      fallbackLng : 'en',
      debug : false
    });
  });

  aurelia.start().then(() => aurelia.setRoot());
}
