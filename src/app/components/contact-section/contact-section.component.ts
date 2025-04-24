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
  envioExitoso: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, this.validarNombre]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(10)]],
      nombreAlias: ['', [Validators.required, Validators.maxLength(10)]],
      telefono1: ['', [Validators.required, this.validarTelefono]],
      telefono: ['', [Validators.required, this.validarTelefono]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      // Para enviar datos a un servicio HTTP
      // Mostrar mensaje de éxito
      this.envioExitoso = true;
      this.contactForm.reset();
      // Mostrar mensaje de éxito (puede ser un alert, toast o span)
      // Opcional: ocultar después de unos segundos
      // Luego de un pequeño delay, activa la alerta
      setTimeout(() => {
        this.envioExitoso = false;
      }, 3000);

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
      if (control.errors?.['soloLetras']) return 'El nombre solo debe contener letras';

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

  private validarNombre(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(valor);
    return soloLetras ? null : { soloLetras: true };
  }

}
