import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationMessage {

  newTestItemNotificationMessage(response) {
    return this.statusCodeMessage(response, 'File uploaded and processing just started');
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

  newApitokenNotificationMessage(response) {
    return this.statusCodeMessage(response, 'Api token has been created');
  }

  deleteApitokenNotificationMessage(response) {
    return this.statusCodeMessage(response, 'Api token has been deleted');
  }

  passwordChangeNotificationMessage(response) {
    return this.statusCodeMessage(response, 'Password has been changed');
  }

  userCreatedNotificationMessage(response) {
    return this.statusCodeMessage(response, 'User has been created');
  }

  userDeletedNotificationMessage(response) {
    return this.statusCodeMessage(response, 'User has been deleted');
  }

  deleteScenarioNotification(response) {
    return this.statusCodeMessage(response, 'Notification has been deleted');
  }

  createScenarioNotification(response) {
    return this.statusCodeMessage(response, 'Notification has been created');
  }

  createItemShareLinkNotification(response) {
    return this.statusCodeMessage(response, 'Link was created');
  }

  deleteItemShareTokenNotification(response) {
    return this.statusCodeMessage(response, 'Link was deleted');
  }

  scenarioThresholdUpdate(response) {
    return this.statusCodeMessage(response, 'Thresholds were updated');
  }

  private statusCodeMessage(response, succesMessgae) {
    let message = { success: false, message: `Something went wrong` };
    if (response.status >= 200 && response.status < 300) {
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
