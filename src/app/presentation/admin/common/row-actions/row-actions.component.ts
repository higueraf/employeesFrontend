import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-row-actions',
  templateUrl: './row-actions.component.html',
  styleUrls: ['./row-actions.component.scss']
})
export class RowActionsComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}