import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertMessageService } from 'src/services/alert-message/alert-message.service';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public isLoading = false;
  public loadPage: any;
  public itemsList: Array<Object> = [];
  public show: boolean = false;
  public total: string = '0';

  constructor(
    private route: Router,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    public loadingController: LoadingController,
    public alertMessageService:AlertMessageService
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getCardProduct();
  }


  async select_address() {
    console.log(JSON.stringify(this.itemsList));
    let userId = JSON.parse(localStorage.getItem('currentUser'));

    let data = {
      id_usuario: userId.id,
      card_items: JSON.stringify(this.itemsList),
    }

    // await this.presentLoading('Cargando datos');
    // this.apiService.post('auth/update_card', data).subscribe(async (res: any) => {
    //   console.log(res);
    //   this.dismiss();
    //   this.route.navigate(['./select-address']);
    // }), error => {
    //   console.log(error);
    //   this.dismiss();
    //   this.alertMessageService.presentToast(
    //     "No se puedo procesar la información."
    //   );
    // };
    this.route.navigate(['./select-address']);
  }

  async getCardProduct() {
    let userId = JSON.parse(localStorage.getItem('currentUser'));
    await this.presentLoading('Cargando carrito');
    this.apiService.post('auth/card', { id_usuario: userId.id }).subscribe(async (res: any) => {
      if(res['data'].length===0) {
        this.itemsList.length=0;
        this.dismiss();
        this.alertMessageService.alertMessage(
          this.translate.instant('app.label.alerta'),
          this.translate.instant('card-empty'),
          this.translate.instant('app.label.back'), '/home'
        );
      }else{
        this.show = true;
        this.itemsList = res['data']
        this.totalPrice();
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

  addItem(itemAdd) {
    let itemsPrice = 0;
    let add = itemAdd['numerOfItems'];
    let itemPrice = parseFloat(itemAdd['price']);
    let unitPrice = parseFloat(itemAdd['cost']);
    if(itemAdd['numerOfItems'] >= 0) {
      add += 1;
      itemAdd['numerOfItems'] = add;
      itemsPrice = itemPrice + unitPrice
      itemAdd['price'] = itemsPrice.toFixed(2).toString();

      this.totalPrice();
    }
  }

  removeItem(itemRemove) {
    let itemsPrice = 0;
    let remove = itemRemove['numerOfItems'];
    let itemPrice = parseFloat(itemRemove['price']);
    let unitPrice = parseFloat(itemRemove['cost']);
    if(itemRemove['numerOfItems'] > 0) {
      remove -= 1;
      itemRemove['numerOfItems'] = remove;
      itemsPrice = itemPrice - unitPrice;
      itemRemove['price'] = itemsPrice.toFixed(2).toString();

      this.totalPrice();
    }
  }
  
  totalPrice() {
    let subTotal: number = 0;
    for (let value of this.itemsList) {
      subTotal = parseFloat(value['price']) + subTotal;
    }
    this.total = subTotal.toFixed(2);
  };

  
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


  prductos(){
    return this.itemsList = [
      {
        "barcode": "24687",
        "code": "",
        "cost": "80.00", // PRECIO POR UNIDAD
        "description": "LIMPIEZA 2(51 - 100 M2)",
        "file_data": "http://149.56.3.240/img/producto.png",
        "id": 13,
        "iddept": 12,
        "name": "LIMPIEZA 2(51 - 100 M2)",
        "price": "240.00",  // PRECIO POR LA CANTIDAD DE ITEMS
        "visble": 1,
        "numerOfItems":3  // ES LA CANTIDAD DE ITEMS DEL PRODUCTO, EJEMPLO, 3 LIMPIEZAS
      },
      {
        "barcode": "24687",
        "code": "",
        "cost": "69.00",
        "description": "LIMPIEZA 2(51 - 100 M2)",
        "file_data": "http://149.56.3.240/img/producto.png",
        "id": 13,
        "iddept": 12,
        "name": "LIMPIEZA 2(51 - 100 M2)",
        "price": "138.00",
        "visble": 1,
        "numerOfItems":2  // ES LA CANTIDAD DE ITEMS DEL PRODUCTO, EJEMPLO, 3 LIMPIEZAS
      },
      {
        "barcode": "24687",
        "code": "",
        "cost": "14.99",
        "description": "LIMPIEZA 2(51 - 100 M2)",
        "file_data": "http://149.56.3.240/img/producto.png",
        "id": 13,
        "iddept": 12,
        "name": "LIMPIEZA 2(51 - 100 M2)",
        "price": "74.95",
        "visble": 1,
        "numerOfItems":5  // ES LA CANTIDAD DE ITEMS DEL PRODUCTO, EJEMPLO, 3 LIMPIEZAS
      },
    ]
  }
}
