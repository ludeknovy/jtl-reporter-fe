import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ToastType = "success" | "danger" | "warning" | "info";

export interface ToastOptions {
  closeButton?: boolean;
  disableTimeOut?: boolean;
  enableHtml?: boolean;
  positionClass?: string;
  timeOut?: number;
}

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
  title?: string;
  closeButton: boolean;
  enableHtml: boolean;
}

@Injectable({ providedIn: "root" })
export class ToastService {
  private nextId = 0;
  private readonly messagesSubject = new BehaviorSubject<ToastMessage[]>([]);

  readonly messages$ = this.messagesSubject.asObservable();

  success(message: string, title?: string, options?: ToastOptions): void {
    this.show("success", message, title, options);
  }

  error(message: string, title?: string, options?: ToastOptions): void {
    this.show("danger", message, title, options);
  }

  warning(message: string, title?: string, options?: ToastOptions): void {
    this.show("warning", message, title, options);
  }

  clear(): void {
    this.messagesSubject.next([]);
  }

  dismiss(id: number): void {
    this.messagesSubject.next(this.messagesSubject.value.filter(message => message.id !== id));
  }

  private show(type: ToastType, message: string, title?: string, options: ToastOptions = {}): void {
    const toast: ToastMessage = {
      id: this.nextId++,
      type,
      message,
      title,
      closeButton: options.closeButton === true,
      enableHtml: options.enableHtml === true,
    };

    this.messagesSubject.next([...this.messagesSubject.value, toast]);

    if (!options.disableTimeOut) {
      window.setTimeout(() => this.dismiss(toast.id), options.timeOut ?? 5000);
    }
  }
}
