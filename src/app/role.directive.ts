import { Directive, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserRole } from './_services/users.model';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[userRole]'
})

export class RoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set userRole(inputRole: UserRole) {
    const { role } = JSON.parse(localStorage.getItem('currentUser'));
    console.log(inputRole);
    const minRole = roleMap.get(inputRole);
    const currentRole = roleMap.get(role);

    if (currentRole >= minRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

const roleMap = new Map([
  [UserRole.Readonly, 1],
  [UserRole.Regular, 2],
  [UserRole.Admin, 3],
]);
