import { Injectable } from '@angular/core';

import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {

  private client: Client;

  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'https://search-dialogue-search-52vroo27gvhgquztawh6hbpxdu.us-east-2.es.amazonaws.com/',
      log: 'trace'
    });
  }

  createIndex(name): any {
    return this.client.indices.create(name);
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'Connected To Elastic Search'
    });
  }

  addToIndex(value): any {
    return this.client.create(value);
  }


  getAllDocumentsWithScroll( searchString, _index, _size): any {
    return this.client.search({
      index: _index,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'size': _size,
        'query': {
          'match': {
            "text": searchString
          }
        },
        'sort': [
          { '_score': { 'order': 'desc' } }
        ]
      }
    });
  }

  getNextPage(scroll_id): any {
    return this.client.scroll({
      scrollId: scroll_id,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id']
    });
  }
}
