import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/services/api/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public loadPage: any;
  public listCategory: Array<object>;
  public listPromotions: Array<object>;
  public isLoading = false;

  constructor(
    private route: Router,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    private menu: MenuController
    ) { }

  ngOnInit() {
    this.getCategoryList();
    this.getPromotionsList();
  }

  async getCategoryList() {
    await this.presentLoading('Cargando datos');
    this.apiService.get('auth/departamentos').subscribe(async (res:any) => {
      this.listCategory = res._data.data;
      this.dismiss();
    }),error =>{
      console.log(error);
      this.dismiss();
    };
  }

  async getPromotionsList() {
    this.apiService.get('auth/promo').subscribe(async (res:any) => {
      this.listPromotions = res._data.data;

      console.log(res)
    }),(error )=>{
      console.log(error);
    };
  }

 item_details(id) {
    this.route.navigate(['/item-detail/', id]);
  } 
 item(id) {
    this.route.navigate(['./item']);
  } 
 search() {
    this.route.navigate(['./search']);
  } 
 cart() {
  // await this.presentLoading(this.translate.instant('app.pages.image.loading'));
  // this.loadPage.dismiss();
    this.route.navigate(['./cart']);
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

  openEnd() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
