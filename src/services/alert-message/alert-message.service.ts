import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(
              public alertController: AlertController,
              private router: Router,
              private toastCtrl: ToastController,) { }

 
  async alertMessage(header, message, buttonText, url) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss:false,
      buttons: [{
        text: buttonText,
        handler: () => {
          this.router.navigate([url], {  skipLocationChange: true });
        }
      }]
    });
    await alert.present();
  }

  async presentToast(message, color?) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color ? color : 'danger',
    });
    return await toast.present();
  }


  async saveAlertMessaje(header, message, buttonTextOne, buttonTextTwo, urlOne, urlTwo) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss:false,
      buttons: [{
        text: buttonTextOne,
        handler: () => {
          this.router.navigate([urlOne], {  replaceUrl: true });
        }
      },
      {
        text: buttonTextTwo,
        handler: () => {
          this.router.navigate([urlTwo], {  skipLocationChange: true });
        }
      }]
    });
    await alert.present();
  }

  async alertSimpleMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss:false,
      buttons: ['ACeptar']
    });
    await alert.present();
  }


}
