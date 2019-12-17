import {FuelType} from "./fuel-type.enum";
import {FuelService} from "../Services/fuel.service";
export class Opperation {
  kioskKey :any;
  index:any ='SHC';
  fuelQuantity : any = 0 ;
  fuelPricePerLiter : any = 0;
  totalPrice:any =0;
  fuelType : any;
  constructor(private fuelService:FuelService) {
    
  }
  getPricePerLiterByFuelType()
  {
    return this.fuelPricePerLiter=this.fuelService.getFuelPricePerLiter();
  }
  generateQrString()
  { 
    let data = {
      "quantite" : this.fuelQuantity,
      "type-carburant" : this.fuelType,
      "index" : this.index,
      "nom-kioske" : this.kioskKey,
      "prix-total" : this.totalPrice
    }
    return JSON.stringify(data);
    
  }
  calculateTotalPrice() 
  {
    
    this.totalPrice=this.fuelPricePerLiter*this.fuelQuantity;
    console.log(this.totalPrice);
    console.log(this.fuelPricePerLiter);
    console.log(this.fuelQuantity);
  }
  calculateQuantity()
  {
    console.log(this.totalPrice);
    console.log(this.fuelPricePerLiter);
    console.log(this.fuelQuantity);
    this.fuelQuantity=this.totalPrice/this.fuelPricePerLiter;
  }
}
