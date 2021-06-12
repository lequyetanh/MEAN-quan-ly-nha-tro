import { Component, OnInit } from '@angular/core';
import { AdminService } from './../admin.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
    catalog: any=[];
    realCatalog: any=[];
    moneyMonth:any = [];
    month:any = [];
    year:any=[];
    data:any ={
        year: '',
        month: [],
        moneyMonth: [],
    };
    list:any=[];
    constructor(
        private adminService: AdminService,
        private router: Router,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
        // this.data.moneyMonth=[10,20,30,40];
        // this.data.month=[1,2,3,4];
        // this.data.year=1999;
        // console.log(this.data);
        // this.list.push(this.data);
        // console.log(this.list);
        // this.getCatalog();
        this.getYear();
    }
    getYear(){
        this.adminService.getAllCatalog().subscribe(catalog=>{
            this.catalog=catalog;
            this.year.push(catalog[0].year);
            for (var i = 1; i < catalog.length; i++) {
                for (var j = 0; j < this.year.length; j++) {
                    if (catalog[i].year == this.year[j]) {
                        break;
                    }
                    if (catalog[i].year != this.year[j]) {
                        if (j == this.year.length - 1) {
                            this.year.push(catalog[i].year);
                            break;
                        }
                        continue;
                    }
                }
            }
            // console.log(this.year);
            // this.month.push(catalog[0].month);
            for(var k=0;k<this.year.length;k++){
                // console.log(this.realCatalog);
                for (var i = 0; i < this.catalog.length; i++) {
                    if(this.catalog[i].year==this.year[k]){
                        this.realCatalog.push(this.catalog[i]);
                    }
                }
                this.month.push(this.realCatalog[0].month);
                for (var i = 1; i < this.realCatalog.length; i++) {
                    for (var j = 0; j < this.month.length; j++) {
                        if (this.realCatalog[i].month == this.month[j]) {
                            break;
                        }
                        if (this.realCatalog[i].month != this.month[j]) {
                            if (j == this.month.length - 1) {
                                this.month.push(this.realCatalog[i].month);
                                break;
                            }
                            continue;
                        }
                    }
                }

                for (var i = 0; i < this.month.length; i++) {
                    var x = 0;
                    for (var j = 0; j < this.realCatalog.length; j++) {
                        if (this.realCatalog[j].month == this.month[i]) {
                            x += this.realCatalog[j].total;
                        }
                    }
                    this.moneyMonth.push(x);
                    x = 0;
                }
                this.data.month=this.month;
                this.data.moneyMonth=this.moneyMonth;
                this.data.year=this.year[k];
                this.list.push(this.data);
                // console.log(this.realCatalog);

                this.month=[];
                this.moneyMonth=[];
                this.realCatalog=[];

                console.log(this.month);
                console.log(this.moneyMonth);
                // console.log(this.realCatalog);
                // break;
            }
        })
    }

    getCatalog() {
        this.adminService.getAllCatalog().subscribe(
            (catalog) => {
                this.catalog = catalog;
                this.month.push(catalog[0].month);
                for (var i = 1; i < catalog.length; i++) {
                    for (var j = 0; j < this.month.length; j++) {
                        if (catalog[i].month == this.month[j]) {
                            break;
                        }
                        if (catalog[i].month != this.month[j]) {
                            if (j == this.month.length - 1) {
                                this.month.push(catalog[i].month);
                                break;
                            }
                            continue;
                        }
                    }
                }

                for (var i = 0; i < this.month.length; i++) {
                    var x = 0;
                    for (var j = 0; j < catalog.length; j++) {
                        if (catalog[j].month == this.month[i]) {
                            x += catalog[j].total;
                        }
                    }
                    this.moneyMonth.push(x);
                    x = 0;
                }
            }
        );
    }
}
