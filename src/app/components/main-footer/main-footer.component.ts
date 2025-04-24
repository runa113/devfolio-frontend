import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  imports: [],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.css'
})
export class MainFooterComponent {
  year: number = 2025;
  name: string = "Facundo Acuña"

}
