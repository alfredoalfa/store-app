import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  public categoryId: any;
  public itemsList:any;
  public loadPage: any;

  constructor(
    private route: Router, 
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    ) {

    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getItemsList();
  }

  async getItemsList() {
    await this.presentLoading('Cargando datos');
    this.apiService.post('auth/pro_dep', {id:this.categoryId}).subscribe(async (res:any) => {
      this.itemsList = res._data.data;
      console.log(this.itemsList);
      this.loadPage.dismiss();
    }),error =>{
      console.log(error);
      this.loadPage.dismiss();
    };
  }

 cart() {
    this.route.navigate(['./cart']);
  } 
 item_details(id) {
    this.route.navigate(['./item-detail', id]);
  }  
 filter() {
    this.route.navigate(['./filter']);
  } 

  async presentLoading(message?) {
    this.loadPage = await this.loadingCtrl.create({
      message: message ? message : this.translate.instant('app.pages.report_detail_ranting.loading')
    });
    await this.loadPage.present();
  }
}
