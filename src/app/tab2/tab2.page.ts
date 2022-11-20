import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalController, IonModal } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private http: HttpClient, public modalController: ModalController) { }
  presentingElement: any = null;
  pickerController: any = null;
  ngOnInit(): void {
    this.refresh();
    this.presentingElement = document.querySelector('.ion-page');
    this.pickerController = document.querySelector('ion-picker-controller');

  }
  meds: any = [];
  labs: any = [];
  action: string = ''; 
  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  currentMed: any = {};
  openModal(med: any, action: string) {
    this.refresh()
    this.action = action;
    this.currentMed = med;
    this.modal.present();
  }
  refresh() {
    this.getMedicamentos().pipe(
      take(1)
    ).subscribe((data: any) => {
      this.meds = data; 
    });
    
    this.getLabs().pipe(
      take(1)
    ).subscribe((data: any) => {
      this.labs = data;
    });
  }

  doAction() {
    if (this.action == 'Editar') {
      this.editar();
    } else {
      this.adicionar();
    }
  }

  editar() {
    this.updateMedicamento(this.currentMed).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  }

  apagar() {
    this.deleteMedicamento(this.currentMed).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  }

  adicionar() {
    this.createMedicamento(this.currentMed).pipe(
      take(1)
    ).subscribe((data: any) => {
      this.refresh();
      this.modal.dismiss(null, 'cancel');
    });
  } 

  getMedicamentos() {
    return this.http.get('https://fiapexercicio3.herokuapp.com/medicamentos/');
  }

  getMedicamento(id: string) {
    return this.http.get('https://fiapexercicio3.herokuapp.com/medicamentos/' + id);
  }

  createMedicamento(medicamento: any) {
    return this.http.post('https://fiapexercicio3.herokuapp.com/medicamentos/', medicamento);
  }

  updateMedicamento(medicamento: any) {
    return this.http.put('https://fiapexercicio3.herokuapp.com/medicamentos/' + medicamento.id, medicamento);
  }

  deleteMedicamento(medicamento: any) {
    return this.http.delete('https://fiapexercicio3.herokuapp.com/medicamentos/' + medicamento.id);
  }

  getLocalMedicamentos() {
    return JSON.parse(localStorage.getItem('medicamentos') || '[]');
  }

  getLabs() {
    return this.http.get('https://fiapexercicio3.herokuapp.com/laboratorios/');
  }

}
