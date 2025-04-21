import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AlphanumericDirective } from '../../shared/directives/alphanumeric.directive';


@Component({
  selector: 'app-contact-section',
  imports: [CommonModule, ReactiveFormsModule,AlphanumericDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(10)]],
      nombreAlias: ['', [Validators.required, Validators.maxLength(420)]],
      telefono: ['', [Validators.required, this.validarTelefono]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      // Para enviar datos a un servicio HTTP
    } else {
      console.log('Formulario inválido');
      this.contactForm.markAllAsTouched(); // Marca todos los campos para mostrar errores
    }
  }

  obtenerMensajeError(campo: string): string | null {
    const control = this.contactForm.get(campo);
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) return 'Este campo es obligatorio';
      if (control.errors?.['telefonoInvalido']) return 'Debe contener exactamente 10 dígitos numéricos';

    }
    return null;
  }

    /* Campo | Validación | Forma
  Teléfono 1 | Usando obtenerMensajeError() | Centralizada ✅
  Teléfono 2 | Validación directa con *ngIf | Desglosada manual ✅
  */
  // Validación personalizada para número telefónico
  private validarTelefono(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const esValido = /^[0-9]{10}$/.test(valor); // Solo 10 dígitos numéricos
    return esValido ? null : { telefonoInvalido: true };
  }
}
