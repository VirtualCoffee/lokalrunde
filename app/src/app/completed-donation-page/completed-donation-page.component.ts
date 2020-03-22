import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-donation-page',
  templateUrl: './completed-donation-page.component.html',
  styleUrls: ['./completed-donation-page.component.scss']
})
export class CompletedDonationPageComponent implements OnInit {

  constructor() { }

  public shareText: string = "Ich habe gerade eine Lokalrunde gegeben.";
  public shareLink: string = "https://www.lokalrunde.de";
  public hashtags: string = "lokalrunde,wirvsvirus";

  ngOnInit() {
  }

}
