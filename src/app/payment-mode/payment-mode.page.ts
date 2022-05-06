import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertMessageService } from 'src/services/alert-message/alert-message.service';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.page.html',
  styleUrls: ['./payment-mode.page.scss'],
})
export class PaymentModePage implements OnInit {
  
  public userId: string;
  public userAdress: string;
  public userPayment: string;
  public isLoading = false;


  constructor(
    private router: Router,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public loadingController: LoadingController,
    public alertMessageService:AlertMessageService
    ) { 
    this.userId = this.router.getCurrentNavigation().extras.state.user_id ? this.router.getCurrentNavigation().extras.state.user_id : null;
    this.userAdress = this.router.getCurrentNavigation().extras.state.user_address ? this.router.getCurrentNavigation().extras.state.user_address : null;
  }

  ngOnInit() {
  }

  async pay() {
    this.userPayment = 'efectivo';

    let data = {
      user_id: this.userId,
      address_selected: this.userAdress,
      payment: this.userPayment
    }

    await this.presentLoading('Cargando datos');
    this.apiService.post('auth/update_address_order', data).subscribe(async (res: any) => {
      this.dismiss();
      this.router.navigate(['./order-confirm'],{  skipLocationChange: true });
    }), error => {
      console.log(error);
      this.dismiss();
      this.alertMessageService.presentToast(
        "No se puedo procesar la información."
      );
    };
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

}
