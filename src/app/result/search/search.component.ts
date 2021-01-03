import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ElasticsearchService } from '../../elasticsearch.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isConnected = false;

  form: FormGroup;
  status: string;
  searchInput: String;
  searchForm;

  constructor(private formBuilder: FormBuilder, private es: ElasticsearchService,
              private cd: ChangeDetectorRef, private router: Router) {
    this.isConnected = false;
    this.searchForm = this.formBuilder.group(
     {searchString: ""}
    )
  }

  ngOnInit() {
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }
  getColor() {
    return (this.status == "OK") ? "green " : "red";
  }
  onSubmit(formObject) {

    if(formObject.searchString.length > 0)
      this.router.navigate(['/searchResults'], { queryParams: { search: formObject.searchString } });
  }
}
