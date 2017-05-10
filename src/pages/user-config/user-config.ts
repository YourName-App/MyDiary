import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

declare var cordova: any;

@Component({
  selector: 'page-user-config',
  templateUrl: 'user-config.html'
})
export class UserConfigPage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;
  avatarFromFile: boolean = false;

  constructor(private navCtrl: NavController, private storage: Storage, 
    private configServ: ConfigService, private localeServ: LocaleService,
    private file: File, private fileChooser: FileChooser,
    private filePath: FilePath) {
  }

  ionViewWillEnter() {
    this.userName = this.configServ.getUserName();

    if (this.userName === null || this.userName.trim().length === 0) {
      this.localeServ.subscribe('YOUR_NAME', (value:string) => { this.userName = value; })
    }

    this.userGender = this.configServ.getUserGender();
    this.userAvatar = this.configServ.getUserAvatar();
    this.theme = this.userGender;
  }

  updateSettings() {
    let prompt:string;
    this.localeServ.localize('YOUR_NAME', (value:string) => { prompt = value; });

    this.userName = (this.userName === null || this.userName.trim().length === 0) ? prompt : this.userName;  // 你的名字是？
    this.userGender = (this.userGender === null || this.userGender.trim().length === 0) ? 'male' : this.userGender;
    this.userAvatar = (this.userAvatar === null || this.userAvatar.trim().length === 0 || this.userAvatar.trim().includes('assets/img/avatar')) 
      ? 'assets/img/avatar-' + this.userGender + '.png' : this.userAvatar;

    this.storage.set('userName', this.userName);
    this.storage.set('userGender', this.userGender);
    this.storage.set('userAvatar', this.userAvatar);

    this.configServ.setUserName(this.userName);
    this.configServ.setUserGender(this.userGender);
    this.configServ.setUserAvatar(this.userAvatar);

    this.navCtrl.pop();
  }

  chooseAvatar() {
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then(nativePath => {
            const filePath = nativePath.replace(/[^\/]*$/, '');
            const fileName = nativePath.replace(/^.*[\\\/]/, '');
        
            this.file.copyFile(filePath, fileName, cordova.file.dataDirectory, fileName)
              .then((data) => {
                this.userAvatar = data.toURL();
              })
              .catch((error) => {
                this.userAvatar = '';
                console.log('COPY_ERROR:' + error.message);
              });
          })
          .catch((error) => {
            console.log('RESOLVE_ERROR:' + error);
          });
      })
      .catch((error) => {
        console.log('OPEN_ERROR:' + error);
      });
  }
}
