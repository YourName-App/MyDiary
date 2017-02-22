import { Component } from '@angular/core';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  theme: string;

  constructor(private configServ: ConfigService) {}

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
}
