import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { FooterComponent }  from './footer/footer.component';
import { DirectivesComponent } from './directives/directives.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivesComponent,
    ClientsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],

  providers: [ClientService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
