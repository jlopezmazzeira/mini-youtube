import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  public titulo: string = "Mi Canal";
  
  constructor() { }

  ngOnInit() {
  }

}
