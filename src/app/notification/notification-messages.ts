import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationMessage {

  newTestItemNotificationMessage(response) {
    return this.statusCodeMessage(response, 'New test item has been saved');
  }

  newProjectNotificationMessage(response) {
    return this.statusCodeMessage(response, 'New project has been saved');
  }

  newScenarionNotificationMessage(response) {
    return this.statusCodeMessage(response, 'New scenario has been created');
  }

  deleteProjectNotification(response) {
    return this.statusCodeMessage(response, 'Project has been deleted');
  }

  itemUpdate(response) {
    return this.statusCodeMessage(response, 'Item info has been updated');
  }

  scenarioUpdate(response) {
    return this.statusCodeMessage(response, 'Scenario has been updated');
  }

  projectUpdate(response) {
    return this.statusCodeMessage(response, 'Project has been updated');
  }

  itemDeleted(response) {
    return this.statusCodeMessage(response, 'Test has been deleted');
  }

  deleteScenario(response) {
    return this.statusCodeMessage(response, 'Scenario has been deleted');
  }

  private statusCodeMessage(response, succesMessgae) {
    let message = { success: false, message: `Something went wrong` };
    if ([200, 204].find(_ => _ === response.status)) {
      message = { success: true, message: succesMessgae };
    } else if (response.status === 400) {
      try {
        message = { success: false, message: response.error.message };
      } catch (e) {
      }
    }
    return message;
  }
}
