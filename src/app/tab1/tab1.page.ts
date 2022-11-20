import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private http: HttpClient, public modalController: ModalController) { }
  presentingElement: any = null;
  ngOnInit(): void {
    this.refresh();
    this.presentingElement = document.querySelector('.ion-page');

  }
  labs: any = [];
  // Typically referenced to your ion-router-outlet

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  action: string = ''; 
  currentLab: any = {};
  openModal(lab: any, action: string) {
    this.action = action;
    this.currentLab = lab;
    this.modal.present();
  }
  refresh() {
    this.getLabs().pipe(
      take(1)
    ).subscribe((data: any) => {

      this.labs = data;
      console.log(this.labs);
    });
  }

  editar() {
    this.updateLab(this.currentLab).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  }

  apagar() {
    this.deleteLab(this.currentLab).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  }

  doAction() {
    if (this.action == 'Editar') {
      this.editar();
    } else {
      this.adicionar();
    }
  }
  
  adicionar() {
    this.createLab(this.currentLab).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  } 

  getLabs() {
    return this.http.get('https://fiapexercicio3.herokuapp.com/laboratorios/');
  }

  getLab(id: string) {
    return this.http.get('https://fiapexercicio3.herokuapp.com/laboratorios/' + id);
  }

  createLab(lab: any) {
    return this.http.post('https://fiapexercicio3.herokuapp.com/laboratorios/', lab);
  }

  updateLab(lab: any) {
    return this.http.put('https://fiapexercicio3.herokuapp.com/laboratorios/' + lab.id, lab);
  }

  deleteLab(lab: any) {
    return this.http.delete('https://fiapexercicio3.herokuapp.com/laboratorios/' + lab.id);
  }

  getLocalLabs() {
    return JSON.parse(localStorage.getItem('labs')!) || [];
  }

}
