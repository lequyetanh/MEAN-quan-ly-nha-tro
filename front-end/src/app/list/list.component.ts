import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    type: String;
    movieType: any;
    people: any[];

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    private allItems: any[];
    pager: any = {};
    pagedItems: any[];

    ngOnInit() {
        this.getSearchMovie();
    }

    getSearchMovie(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const type = params.get('name');
            this.type = type;
            // console.log(this.type);
            this.dataService.getPeopleFromSearch(type).subscribe(
                (people) => {
                    this.people = people;
                    for(var i=0;i<this.people.length;i++){
                        this.people[i].total=this.numberWithCommas(this.people[i].total);
                        this.people[i].electricity_bill=this.numberWithCommas(this.people[i].electricity_bill);
                        this.people[i].water_bill=this.numberWithCommas(this.people[i].water_bill);
                        this.people[i].room_bill=this.numberWithCommas(this.people[i].room_bill);
                    }
                    this.setPage(1);
                }
            );
        })
    }

    numberWithCommas(x) {
        x = x.toString();
        // console.log("x="+x);
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
            // console.log(x);
        return x;
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.dataService.getPager(this.people.length, page);
    
        // get current page of items
        this.pagedItems = this.people.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}
