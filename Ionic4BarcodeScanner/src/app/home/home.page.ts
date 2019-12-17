import { Component } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';
import {FuelService} from '../Services/fuel/fuel.service';
import {Opperation} from '../Entities/opperation';
import {FuelType} from '../Entities/fuel-type.enum';
import { from } from 'rxjs';
import {OpperationService} from '../Services/opperation/opperation.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  encodeData: any;
  scannedData: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  opperation: any ;
  constructor(private barcodeScanner: BarcodeScanner, private fuelService: FuelService, private opperationService: OpperationService) {
    this.opperation = new Opperation(fuelService);
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;
        console.log(this.scannedData);
        this.opperation= JSON.parse(this.scannedData['text']);
      })
      .catch(err => {
        console.log("Error", err);
      });
    //   this.scannedData=true;
    //   this.opperation={
    //     "index": "SHC",
    //     "kioske": "Total",
    //     "compte_kioske": "45658",
    //     "type_carburant": "diesel",
    //     "quantite": "20",
    //     "prix_total": "100"
    // }
  }
  validation() {
    this.opperation={
      "utilisateur": "client",
      "compte_utilisateur": "111",
      "index": "SHC",
      "kioske": "kioske",
      "compte_kioske": "222",
      "type_carburant": "diesel",
      "quantite": "20",
      "prix_total": "100"
    }
    const sendData = this.opperation;
    console.log(this.opperation);
    this.opperationService.payOpperation(sendData).subscribe(data => console.log(data));
  }
  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log('Error occured : ' + err);
        }
      );
  }
}
