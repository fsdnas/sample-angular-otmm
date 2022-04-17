import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  enteredKeyword: string = '';

  constructor(private _assets: AssetsService) {}

  keyword(e: any) {
    this.enteredKeyword = e.target.value;
    console.log(this.enteredKeyword);
    this._assets.changeAsset(this.enteredKeyword);
  }
}
