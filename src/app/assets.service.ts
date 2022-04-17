import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  assetValue$: Subject<string> = new Subject();
  constructor() {}

  changeAsset(asset: string) {
    this.assetValue$.next(asset);
  }
}
