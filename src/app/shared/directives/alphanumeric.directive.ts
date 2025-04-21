import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAlphanumeric]'
})
export class AlphanumericDirective {
  private esLetraCompuesta: boolean = false;
  @Input() allowSpaces: boolean = false;

  constructor(public control: NgControl) { }

  //Eventos sobre la composición, para impedir introducir solo (´)
  @HostListener('compositionstart') onCompositionStart() {
    this.esLetraCompuesta = true;
  }

  @HostListener('compositionend', ['$event']) onCompositionEnd(event: Event) {
    this.esLetraCompuesta = false;
    this.filtroTexto(event);
  }

  //Filtro al escribir
  @HostListener('input', ['$event']) onInputChange(event: Event) {
    if (!this.esLetraCompuesta) {
      this.filtroTexto(event);
    }
  }

  //Filtro en pegado dentro del input
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {

    setTimeout(() => {

      this.filtroTexto(event);

    }, 0);
  }

  private filtroTexto(event: Event | ClipboardEvent) {

    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const pattern = this.allowSpaces ? (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9. ]+$/) : (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9.]+$/);

    if (!pattern.test(inputValue)) {

      //Guarda la posición del cursor
      const position = inputElement.selectionStart;

      let valueClean = inputValue.replace(this.allowSpaces ? /[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9. ]/g : /[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9.]/g , '');

      //Actualizar el value
      this.control.control?.setValue(valueClean, { emitEvent: true });
      if (position != null) {
        inputElement.setSelectionRange(position, position);
      }
    }
  }
}
