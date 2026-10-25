import "zone.js";
import { enableProdMode, provideZoneChangeDetection } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// Angular 21+ enables zoneless change detection by default. This legacy
// NgModule application relies on mutable component state updated in RxJS
// subscriptions, so retain ZoneJS-driven change detection until those flows
// are migrated to signals.
platformBrowserDynamic().bootstrapModule(AppModule, {
  applicationProviders: [provideZoneChangeDetection()]
})
  .catch(err => console.log(err));
