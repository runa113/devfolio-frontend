import { Component } from '@angular/core';
import { ContactSectionComponent } from "../contact-section/contact-section.component";

@Component({
  selector: 'app-professional-profile',
  imports: [ContactSectionComponent],
  templateUrl: './professional-profile.component.html',
  styleUrl: './professional-profile.component.css'
})
export class ProfessionalProfileComponent {

  verCV() {
    window.open('assets/docs/cv.pdf', '_blank');
  }

}
