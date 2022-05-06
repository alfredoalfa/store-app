import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertMessageService } from 'src/services/alert-message/alert-message.service';
import { ApiService } from 'src/services/api/api.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  public FavoriteIcon = false;
  public productId: any;
  public productDetail: any;
  public show: boolean = false;
  public loadPage: any;
  public isLoading = false;

  constructor(
    private route: Router,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public loadingController: LoadingController,
    public alertMessageService:AlertMessageService) {

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getItemsDetail();
  }


  async getItemsDetail() {
    await this.presentLoading('Cargando datos');
    this.apiService.post('auth/des_pro', { id: this.productId }).subscribe(async (res: any) => {
      this.productDetail = res._data;
      this.show = true;
      console.log(this.productDetail);
      this.dismiss();
    }), error => {
      console.log(error);
      this.dismiss();
      this.alertMessageService.alertMessage(
        this.translate.instant('app.label.error'),
        this.translate.instant('error-service'),
        this.translate.instant('app.label.back'), '/home'
      );
    };
  }

  async addToCard(itemId) {
    let userId = JSON.parse(localStorage.getItem('currentUser'));
    let sendToCard = {
      id_usuario: userId.id,
      itemid: itemId
    };

    await this.presentLoading('Agregando item');
    this.apiService.post('auth/add_card', sendToCard).subscribe(async (res: any) => {
      console.log(res);
      this.alertMessageService.alertMessage(
        this.translate.instant('Add-item-card-title'),
        this.translate.instant('Add-item-card'),
        this.translate.instant('app.label.back'), '/home'
      );
      this.dismiss();
    }),(error) => {
      console.log(error);
      this.dismiss();
      this.alertMessageService.alertMessage(
        this.translate.instant('app.label.error'),
        this.translate.instant('error-service'),
        this.translate.instant('app.label.back'), '/home'
      );
    };

  }

  toggleFavoriteIcon() {
    this.FavoriteIcon = !this.FavoriteIcon;
  }

  cart() {
    this.route.navigate(['./cart']);
  }
  reviews() {
    this.route.navigate(['./reviews']);
  }
  seller_info() {
    this.route.navigate(['./seller-info']);
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
