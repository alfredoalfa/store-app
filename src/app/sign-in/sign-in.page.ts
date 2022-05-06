import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  constructor(
              private navCtrl: NavController, 
              private route: Router,
              private auth: AuthService,
              private router: Router,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController
    ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  new_orders() {
    this.navCtrl.navigateRoot(['./new-orders']);
  } 

  async login() {
    const loader = await this.loadingCtrl.create({});
    loader.present();

    this.auth.login(this.credentials).subscribe(async res => {
      if (res) {
        this.router.navigateByUrl('/home');
        loader.dismiss();
      } else {
        await this.alert();
        loader.dismiss();
      }
    }, async err=>{
      await this.alert();
      loader.dismiss();
    });
  }

  register() {
    this.router.navigateByUrl('/sign-up');
  }


  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Fallo el Inicio de sesión',
      message: 'Las credenciales no son válidas.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
