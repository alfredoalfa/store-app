import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  public onRegisterForm: FormGroup;
  
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private apiService:ApiService,
    ) { }

  ngOnInit() {
    // Configuración del formulario
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'password_confirmation': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

 async verification() {

   if (this.onRegisterForm.dirty && this.onRegisterForm.valid) {
     var response: any = [];
     const loader = await this.loadingCtrl.create({});

     loader.present();
     if (this.onRegisterForm.value.password != this.onRegisterForm.value.password_confirmation) {
       loader.dismiss();
       this.showError(this.translate.instant('app.label.errors.password'));
     } else {
       console.log('Obteniendo el usuario');
       // Se realiza la peticion al servicio para registrar el usuario
       this.apiService.post('auth/register', this.onRegisterForm.value).subscribe(
         (data) => {
           response = data;
           loader.dismiss();
           this.showMSN("Éxito !", this.translate.instant('register_success'));
           this.route.navigateByUrl('/sign-in');

           loader.dismiss();
         },
         (error) => {
           console.log(error);
           loader.dismiss();
           this.showError(this.translate.instant('bad_register'));
           this.route.navigateByUrl('/sign-in');
         }
       );
     }
   } else {
     this.showError(this.translate.instant('field_invalid'));
   }
  }

  async showError(mess: string) {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('app.label.error'),
      subHeader: mess,
      buttons: [{ text: 'OK', cssClass: 'text-color-secondary' }],

    });
    await alert.present();
  }

  async showMSN(header: string, mess: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: mess,
      buttons: [{ text: 'OK', cssClass: 'text-color-secondary' }],

    });
    await alert.present();
  }
}
