import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { text: string, text_button?: string, text_close_button?: string, action_ok: () => {}, action_chiudi: () => {}, backoffice: boolean, form?: boolean }) { }

  input: string = '';

  onConfirmClick(): void {
    this.data.action_ok();
    this.dialogRef.close(true);
  }

  onCloseClick(): void {
    this.data.action_chiudi();
    this.dialogRef.close(false);
  }

}
