import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MainFooterComponent } from "./components/main-footer/main-footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devfolio-frontend';
}
