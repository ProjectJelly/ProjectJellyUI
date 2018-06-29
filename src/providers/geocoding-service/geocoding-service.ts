import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
// import 'rxjs/add/operator/map';
// import { NativeGeocoder,
//          NativeGeocoderReverseResult,
//          NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

/*
  Generated class for the GeocodingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocodingServiceProvider {

  constructor(public http       : Http, private appConstants: AppConstantsProvider){}

  
//   forwardGeocode(keyword : string) : Promise<any>
// {
//    return new Promise((resolve, reject) =>
//    {
//       this._GEOCODE.forwardGeocode(keyword)
//       .then((coordinates : NativeGeocoderForwardResult) =>
//       {
//          let str : string   = `The coordinates are latitude=${coordinates.latitude} and longitude=${coordinates.longitude}`;
//          alert('coordinates' + coordinates);
//          resolve(str);
//          return coordinates;
//       })
//       .catch((error: any) =>
//       {
//          reject(error);
//       });
//    });
// }

getGeocode(address: string){
  return this.http.get(this.appConstants.geocoderAPI + 'address=' + address + '&key=' + this.appConstants.geocoderAPIKey);
}

}
