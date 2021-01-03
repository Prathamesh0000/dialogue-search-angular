import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ResultSource } from '../result.interface';
import { ElasticsearchService } from '../../elasticsearch.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {

  private static readonly INDEX = 'dialogue-search-v1';
  private static readonly TYPE = 'customer';
  private static readonly SIZE = 5;


  resultSources: ResultSource[];
  haveNextPage = false;
  scrollID = '';
  searchString = '';
  notice = '';

  constructor(private es: ElasticsearchService, private route: ActivatedRoute, private router: Router) {
    this.scrollID = '';
    this.notice = '';
    this.haveNextPage = false;
  }

  ngOnInit() {

    this.route.queryParams
    .subscribe((params) => {
      this.searchString = params['search'];
      console.log(this.searchString);
    }
  );

    this.es.getAllDocumentsWithScroll(
      this.searchString,
      ShowResultsComponent.INDEX,
      ShowResultsComponent.SIZE).then(
      response => {
        this.updateEpisodeName(response.hits.hits);
        this.resultSources = response.hits.hits;

        if (response.hits.hits.length < response.hits.total.value) {
          this.haveNextPage = true;
          this.scrollID = response._scroll_id;

        }
        console.log(response.hits.hits.length + " " + response.hits.total);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Customer Completed!');
      });
  }


  updateEpisodeName(ObjectList) {
    for(let i = 0; i < ObjectList.length; i++) {
      let eachObj = ObjectList[i]._source;
      if(eachObj != undefined && eachObj["strName"]!= undefined) {
        let EpisodeName = eachObj["strName"].split("/");
        EpisodeName = EpisodeName[EpisodeName.length - 1];
        EpisodeName = EpisodeName.split(".srt");
        EpisodeName = EpisodeName[0];
        console.log(EpisodeName);
        eachObj["strName"] = EpisodeName;
      }
    }
     return ObjectList;
   }

  showNextPage() {
    this.es.getNextPage(this.scrollID).then(
      response => {
        this.resultSources = response.hits.hits;
        if (!response.hits.hits) {
          this.haveNextPage = false;
          this.notice = 'There are no more Customers!';
        }
        console.log(response);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Customer Completed!');
      });
  }

  redirectToSearchPage() {
    this.router.navigate(['/search']);
  }
}
