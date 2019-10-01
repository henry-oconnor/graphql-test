import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

class Response {
  rates: any[] = [];
  loading: boolean = true;
  error: any = "";
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})

export class ExchangeRatesComponent implements OnInit {
  public response: Response;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log('here');
    this.apollo
    .watchQuery<Response>({
      query: gql`
      {
        rates(currency: "$currency") {
          currency
          rate
        }
      }
      `,
      variables: { currency: 'USD'}
    })
    .valueChanges.subscribe(result => {
      this.response.rates = result.data && result.data.rates;
      this.response.loading = result.loading;
      this.response.error = result.errors;
    });
  }
}
