import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ElasticsearchService } from './elasticsearch.service';
import { SearchComponent } from './result/search/search.component';

import { ShowResultsComponent } from './result/show-results/show-results.component';
import { ResultDetailsComponent } from './result/result-details/result-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ShowResultsComponent,
    ResultDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ElasticsearchService],
  bootstrap: [AppComponent]
})

export class AppModule { }
