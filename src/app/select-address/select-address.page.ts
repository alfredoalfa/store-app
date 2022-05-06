import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {
  
  public userAddress: Array<object>;
  public userInfo: Object;
  public userAdress: string;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getAddress();
  }

  getAddress() {
    let userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.userInfo = userInfo;
    this.userAddress = [
      {
        number:1,
        adress:userInfo.homeaddress,
        name:"Hogar"
      },
      {
        number:2,
        adress:userInfo.officeaddress,
        name:"Oficina"
      },
      {
        number:3,
        adress:userInfo.otheraddress,
        name:"Otro"
      }
    ]
  }

  checkValue(event){
    this.userAdress = event.detail.value;
  }

  payment_mode() {
    if (this?.userAdress) {
      const navigationExtras: NavigationExtras = {
        state: {
          user_id: this.userInfo['id'],
          user_address: this.userAdress
        }
      };
      this.route.navigate(['./payment-mode'], navigationExtras);
    }
  }

 my_profile() {
    this.route.navigate(['./my-profile']);
  } 
}
