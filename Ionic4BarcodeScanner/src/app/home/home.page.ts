import { Component } from "@angular/core";
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {FuelService} from "../Services/fuel.service";
import {Opperation} from "../Entities/opperation";
import {FuelType} from "../Entities/fuel-type.enum";
import { Storage } from '@ionic/storage';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})

export class HomePage {
  encodeData: any;
  quantitdt : boolean = false;
  quantitl : boolean = false;
  fuel : [];
  dataStored: boolean = false;
  scannedData: any;
  formOn : boolean=false;
  barcodeScannerOptions: BarcodeScannerOptions;
  opperation:Opperation ;
  fuelType : FuelType = FuelType.diesel;
  constructor(private storage: Storage,private barcodeScanner: BarcodeScanner,private fuelService:FuelService) {
    this.opperation = new Opperation(fuelService);
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    this.storage.get("key").then(data=>{
      if(data!=null)
      {
        console.log("stord key :"+data);
        this.dataStored=true;
        this.storage.get('fuel').then(data=>{
          console.log("Stored fuel data : "+data);
          this.fuel=data;
        })
      }
      
    })
    
  }
  scanCodeTest()
  {
    this.scannedData={"key":"test","fuel" : [{"_id" : "3","type" : "diesel","denomination":"test","prix":"1.9","description":"aa"}]};
        console.log(this.scannedData);
        if(this.scannedData["key"])
        {
          console.log("key on");
          this.storage.set("key",this.scannedData["key"]);
          this.dataStored=true;
          console.log(this.storage.get("key"));
          console.log(this.storage.get("fuel"));
        }
        if(this.scannedData["fuel"])
        {
          console.log(this.scannedData["fuel"]);
          this.storage.set("fuel",this.scannedData["fuel"]);
          this.fuel=this.scannedData["fuel"];
          this.dataStored=true;
          console.log(this.storage.get("key"));
          console.log(this.storage.get("fuel"));
        }
        if((!this.scannedData["fuel"])||(!this.scannedData["key"]))
        {
          console.log("data false");
          this.dataStored=false;
          alert("Not valid data");
          console.log(this.storage.get("key"));
          console.log(this.storage.get("fuel"));
        }
  }
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;
        this.scannedData=JSON.parse(this.scannedData["text"]);
        //this.scannedData={"key":"test","fuel" : [{"_id" : "3","type" : "diesel","denomination":"test","prix":"1.9","description":"aa"}]};
        console.log(this.scannedData);
        if(this.scannedData["key"])
        {
          console.log("key on");
          this.storage.set("key",this.scannedData["key"]);
          this.dataStored=true;
        }
        if(this.scannedData["fuel"])
        {
          console.log("fuel on");
          this.storage.set("fuel",this.scannedData["fuel"]);
          this.fuel=this.scannedData["fuel"];
          this.dataStored=true;
        }
        if((!this.scannedData["fuel"])||(!this.scannedData["key"]))
        {
          console.log("data false");
          this.dataStored=false;
          alert("Not valid data");
        }
      })
      .catch(err => {
        console.log("Error", err);
      });

  }
  fillTotalPrice()
  {
    if(!this.quantitdt)
    {
      this.quantitl=true;
      console.log("opperation fill total price");
      console.log(this.opperation);
      this.opperation.calculateTotalPrice();
      
    }
    else
    {
      this.quantitdt=false;
    }
    
  }
  fillQuantity()
  {
    if(!this.quantitl)
    {
      this.quantitdt=true;
      this.opperation.calculateQuantity();
    }
    else
    {
      this.quantitl=false;
    }
    
  }
  selectFuelType(fueldata)
  { 
      var data=fueldata;
      data=data.split('*',2);
      this.formOn=true;
      this.opperation.totalPrice=0;
      this.opperation.fuelQuantity=0;
      this.opperation.fuelPricePerLiter=data[0];
      this.opperation.fuelType=data[1];
      console.log(this.opperation);
  }
  encodedText() {
    this.storage.get("key").then(data=>{
      this.opperation.kioskKey=data;
      console.log(this.opperation.generateQrString());
      this.encodeData=this.opperation.generateQrString();
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
    });
    
  }
}
