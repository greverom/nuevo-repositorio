import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

   constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title, {
      positionClass: 'toast-center-center'
    });
  }

  showError(message: string, title?: string): void {
    this.toastr.error(message, title, {
      positionClass: 'toast-center-center'
    });
  }

  showInfo(message: string, title?: string): void {
    this.toastr.info(message, title, {
      positionClass: 'toast-center-center'
    });
  }

  showWarning(message: string, title?: string): void {
    this.toastr.warning(message, title, {
      positionClass: 'toast-center-center'
    });
  }
}
