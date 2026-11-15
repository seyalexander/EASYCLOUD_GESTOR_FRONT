import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-lista-serie-page',
  imports: [ButtonModule, RatingModule, TableModule, TagModule, ToastModule, RippleModule, FormsModule],
  templateUrl: './lista-serie-page.html',
  styleUrl: './lista-serie-page.css',
  providers: [ MessageService]
})
export class ListaSeriePage {

}
