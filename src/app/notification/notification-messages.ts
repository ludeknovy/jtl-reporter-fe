import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class NotificationMessage {

  newTestItemNotificationMessage(response) {
    return this.statusCodeMessage(response, "File uploaded and processing just started");
  }

  newProjectNotificationMessage(response) {
    return this.statusCodeMessage(response, "New project has been saved");
  }

  newScenarioNotificationMessage(response) {
    return this.statusCodeMessage(response, "New scenario has been created");
  }

  deleteProjectNotification(response) {
    return this.statusCodeMessage(response, "Project has been deleted");
  }

  itemUpdate(response) {
    return this.statusCodeMessage(response, "Item info has been updated");
  }

  scenarioUpdate(response) {
    return this.statusCodeMessage(response, "Scenario has been updated");
  }

  scenarioUserSettingsUpdate(response) {
    return this.statusCodeMessage(response, "Scenario user settings has been updated");
  }

  projectUpdate(response) {
    return this.statusCodeMessage(response, "Project has been updated");
  }

  itemDeleted(response) {
    return this.statusCodeMessage(response, "Test has been deleted");
  }

  deleteScenario(response) {
    return this.statusCodeMessage(response, "Scenario has been deleted");
  }

  newApitokenNotificationMessage(response) {
    return this.statusCodeMessage(response, "Api token has been created");
  }

  deleteApitokenNotificationMessage(response) {
    return this.statusCodeMessage(response, "Api token has been deleted");
  }

  passwordChangeNotificationMessage(response) {
    return this.statusCodeMessage(response, "Password has been changed");
  }

  userCreatedNotificationMessage(response) {
    return this.statusCodeMessage(response, "User has been created");
  }

  userDeletedNotificationMessage(response) {
    return this.statusCodeMessage(response, "User has been deleted");
  }

  deleteScenarioNotification(response) {
    return this.statusCodeMessage(response, "Notification has been deleted");
  }

  createScenarioNotification(response) {
    return this.statusCodeMessage(response, "Notification has been created");
  }

  createItemShareLinkNotification(response) {
    return this.statusCodeMessage(response, "Link was created");
  }

  deleteItemShareTokenNotification(response) {
    return this.statusCodeMessage(response, "Link was deleted");
  }

  scenarioTrendsSettingsNotification(response) {
    return this.statusCodeMessage(response, "Scenario trend settings updated");
  }

  globalSettingsNotification(response) {
    return this.statusCodeMessage(response, "Settings updated");
  }

  createScenarioShareToken(response) {
    return this.statusCodeMessage(response, "Scenario share token was created");
  }

  deleteScenarioShareTokenNotification(response) {
    return this.statusCodeMessage(response, "Scenario share token was deleted");

  }

  appInitialization(response) {
    return this.statusCodeMessage(response, "")
  }

  private statusCodeMessage(response, successMessage) {
    let message = { success: false, message:  (typeof response === "string" && !response?.includes("Unexpected error")) ? response : "Unexpected error occurred" };
    if (response.status >= 200 && response.status < 300) {
      message = { success: true, message: successMessage };
    } else if (response.status === 400) {
      try {
        message = { success: false, message: response.message };
      } catch (e) {
        return
      }
    }
    return message;
  }
}
