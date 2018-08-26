import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BUILDINGS } from '../datos/mock.buildings.list';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Building } from '../datos/class.city.building';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.sass']
})
export class AddBuildingComponent implements OnInit, OnDestroy {
  modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) { }
  public BUILDINGS = BUILDINGS;

  buildingForm: FormGroup;
  searchBarSubscription: Subscription;

  @Output() addBuildingAcceptEvent = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Output() deleteBuildingevent = new EventEmitter();

  ngOnInit() {
    this.buildingForm = new FormGroup({
      'name': new FormControl(null),
    });

    this.searchBarSubscription = this.buildingForm.controls['name'].valueChanges.subscribe((name) => {
      if (name) { this.filterBuilding(name); } else {
        this.BUILDINGS = BUILDINGS;
      }
    });
  }

  public addBuilding(content): void {
    this.modalRef = this.modalService.open(content);
  }

  public addBuildingAccept(building: Building) {
    this.addBuildingAcceptEvent.emit(building);
  }

  public deleteBuildingAccept() {
    this.deleteBuildingevent.emit();
  }

  public close(): void {
    this.closeModal.emit('Cross click');
    //this.modalRef.close();
  }

  filterBuilding(str: string) {
    this.BUILDINGS = this.BUILDINGS.filter((build) => {
      // console.log(build.name + ' --> ' + build.name.includes(str) );
      return build.name.toUpperCase().includes(str.toUpperCase());
    });
  }

  ngOnDestroy() {
    this.searchBarSubscription.unsubscribe();
  }
}
