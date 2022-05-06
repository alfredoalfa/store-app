import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertMessageService } from 'src/services/alert-message/alert-message.service';
import { ApiService } from 'src/services/api/api.service';
import { UserInfo } from '../../models/user-info/user-info';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  public isLoading = false;
  public loadPage: any;
  public show: boolean = false;
  public userInfoForm: FormGroup;
  public userData: object;

  constructor(
    private route: Router,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public loadingController: LoadingController,
    public alertMessageService:AlertMessageService,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    ) { }

  ngOnInit() {
        // Configuración del formulario
        this.userInfoForm = this.formBuilder.group({
          'fullname': ['', Validators.compose([
            Validators.required
          ])],
          'email': [null, Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])],
          'phone': [null, Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ])],
          'homeaddress': [null, Validators.compose([
            Validators.required
          ])],
          'officeaddress': [null, Validators.compose([
          ])],
          'otheraddress': [null, Validators.compose([
          ])]
        });
    this.getUserInfo();
  }

  async getUserInfo() {
    let userId = JSON.parse(localStorage.getItem('currentUser'));
    await this.presentLoading('Cargando Datos de Usuario');
    this.apiService.post('auth/get_info_user', { id_usuario: userId.id }).subscribe(async (res: any) => {

      if (res['data'].length > 0) {
        this.userData = res['data'][0];
        let datos = {
          fullname: this.userData['fullname'],
          email: this.userData['email'],
          phone: this.userData['phone'],
          homeaddress: this.userData['homeaddress'] == 'null' ? '' : this.userData['homeaddress'],
          officeaddress: this.userData['officeaddress'] == 'null' ? '' : this.userData['officeaddress'],
          otheraddress: this.userData['otheraddress'] == 'null' ? '' : this.userData['otheraddress'],
        }
        this.userInfoForm.setValue(datos, { onlySelf: true, emitEvent: false });
        this.dismiss();
      } else {
        this.alertMessageService.alertMessage(
          this.translate.instant('app.label.alerta'),
          'No hay datos de usuario',
          this.translate.instant('app.label.back'), '/home'
        );
        this.dismiss();
      }
    }), error => {
      this.dismiss();
      this.alertMessageService.alertMessage(
        this.translate.instant('app.label.error'),
        this.translate.instant('error-service'),
        this.translate.instant('app.label.back'), '/home'
      );
    };
  }

  async onSubmit() {
    console.log(this.userInfoForm);
    let userId = JSON.parse(localStorage.getItem('currentUser'));
    if (this.userInfoForm.dirty && this.userInfoForm.valid) {
     
      let datos = { 
        id_usuario: userId.id,
        ...this.userInfoForm.value
      }

      await this.presentLoading('Actualizando Datos');
      this.apiService.post('auth/add_address_user', datos).subscribe(async (res: any) => {

        if (res?.mensage) {
          this.alertMessageService.alertMessage(
            this.translate.instant('success'),
            res.mensage,
            this.translate.instant('app.label.back'), '/home'
          );
          this.dismiss();
        } else {
          this.alertMessageService.alertMessage(
            this.translate.instant('app.label.alerta'),
            'No se pudieron actualizar los datos',
            this.translate.instant('app.label.back'), '/home'
          );
          this.dismiss();
        }
        this.dismiss();
      }), error => {
        this.dismiss();
        this.alertMessageService.alertMessage(
          this.translate.instant('app.label.error'),
          this.translate.instant('error-service'),
          this.translate.instant('app.label.back'), '/home'
        );
      };
   
    } else {
      this.showError(this.translate.instant('field_invalid'));
    }
  }

  async presentLoading(message?) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: message ? message : this.translate.instant('app.pages.report_detail_ranting.loading')
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
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
