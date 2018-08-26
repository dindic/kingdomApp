import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-kingdoms-container',
  templateUrl: './saved-kingdoms-container.component.html',
  styleUrls: ['./saved-kingdoms-container.component.sass']
})
export class SavedKingdomsContainerComponent implements OnInit {
  idCreator: string;
  user: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idCreator = this.route.snapshot.params['idc'];
  }

}
