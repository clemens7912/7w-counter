import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerSelection } from '../../shared/models/playerSelection';
import { Wonder } from '../../shared/models/wonder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wonder-selection-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wonder-selection-modal.component.html',
  styleUrl: './wonder-selection-modal.component.scss'
})
export class WonderSelectionModalComponent {

  player: PlayerSelection;
  wonders: Wonder[];

  constructor(public activeModal: NgbActiveModal){}

  confirm(){
    this.activeModal.close(this.player);
  }

  cancel(){
    this.activeModal.dismiss('User canceled');
  }
}
