
import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.onShopPriceChange(null); 
  }

  title = 'Fancy Shop';

  shopPrice: number = 10;
  tax: number = 0.06;
  packageCost: number = 3;
  transferPerc: number = 0.05;
  dollarRate = 26.5;
  iWantPriceUAH = this.getZeroProfitPriceUAH()*1.5;
  dollarPrice = this.getDolarPriceFromIwantPrice();
  iWantProfitUAH = 0;
  iWantProfitUSD = 0;
  
  roundFin(n: number) {
    n = n * 100;
    n = Math.round(n);
    n = n/100.00;
    return n;
  }

  getDolarPriceFromIwantPrice():number {
    return this.roundFin(this.iWantPriceUAH / this.dollarRate);
  }
  
  updateAfterShopPriceChange() {
    console.log("updateAfterShopPriceChange");
    this.dollarPrice = this.getDolarPriceFromIwantPrice();
    this.iWantPriceUAH = this.roundFin(this.getZeroProfitPriceUAH()* 1.5);
    this.iWantProfitUAH = this.roundFin(this.getProfitUAH());
    this.iWantProfitUSD = this.roundFin(this.getProfitUSD());
  }
   
  onIWantPriceChanged(e) {
    console.log("onIWantPriceChanged");
    this.dollarPrice = this.getDolarPriceFromIwantPrice();
    this.iWantProfitUAH = this.roundFin(this.getProfitUAH());
    this.iWantProfitUSD = this.roundFin(this.getProfitUSD());
  }

  onShopPriceChange(e) {
    console.log("onShopPriceChange");
    this.updateAfterShopPriceChange();
  }


  onIWantProfitUAHChanged(e) {
    console.log("onIWantProfitUAHChanged");
    this.iWantPriceUAH = this.roundFin(this.getZeroProfitPriceUAH() + this.iWantProfitUAH);
    this.iWantProfitUSD = this.roundFin(this.iWantProfitUAH / this.dollarRate);
  } 

  onIWantProfitUSDChanged(e) {
    console.log("onIWantProfitUSDChanged");
    this.iWantPriceUAH = this.roundFin(this.getZeroProfitPriceUAH() + this.iWantProfitUSD * this.dollarRate);
    this.iWantProfitUAH = this.roundFin(this.iWantProfitUSD * this.dollarRate);
  }

  onTaxChange(e) {
    this.updateAfterShopPriceChange();
  }

  onPackageCostChange(e) {
    this.updateAfterShopPriceChange();
  }

  onTransferPercChange(e) {
    this.updateAfterShopPriceChange();
  }

  onDollarRateChange(e) {
    this.updateAfterShopPriceChange();
  }


  getZeroProfitPriceUSD() {
    return this.roundFin((this.shopPrice * (1 + this.tax) + this.packageCost) * (1 + this.transferPerc));
  }

  getZeroProfitPriceUAH() {
    return this.roundFin(this.getZeroProfitPriceUSD() * this.dollarRate);
  }

  getProfitUSD() {
    return this.roundFin(this.iWantPriceUAH / this.dollarRate - this.getZeroProfitPriceUSD());
  }

  getProfitUAH() {
    return this.roundFin(this.iWantPriceUAH  - this.getZeroProfitPriceUSD() * this.dollarRate);
  }



 
}
