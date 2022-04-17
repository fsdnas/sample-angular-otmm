import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  keyWord: string = '';
  constructor(private _router: Router, private _assets: AssetsService) {
    this._assets.assetValue$.subscribe((d) => (this.keyWord = d));
  }

  ngOnInit() {}
  assetImg = 'https://m.media-amazon.com/images/I/71fxRofm9FL._SL1500_.jpg';
  assetName = '';

  onClickAsset() {
    console.log('clicked Asset');
    this._router.navigate(['/asset-details']);
  }
}
