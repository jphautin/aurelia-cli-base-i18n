import {I18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework'

@autoinject
export class App {

  message = 'Hello World!';

  constructor(private i18n:I18N,private element:Element,ea:EventAggregator) {
    var self=this;
    //this.i18n.setLocale('fr');
    ea.subscribe('i18n:locale:changed', payload => {
      self.updateTranslations();
    });
  }

  attached(){
    this.updateTranslations();
  }

  updateTranslations() {
    console.log("updating translation");
    this.i18n.updateTranslations(this.element);
  }

  setLocale(id:string) {
    this.i18n.setLocale(id);
  }

  getLocale(id:string):string {
    return this.i18n.getLocale();
  }
}
