import { Component, OnInit } from '@angular/core';
import { AdminService } from './../admin.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// import * as Chart from 'chart.js';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    month1: any=[];
    month2: any=[];
    month3: any=[];1
    month4: any=[];
    month5: any=[];
    month6: any=[];
    month7: any=[];
    month8: any=[];
    month9: any=[];
    month10: any=[];
    month11: any=[];
    month12: any=[];
    LineChart: any;
    BarChart: any;
    height: any = 500;
    catalog: any;
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];
    moneyMonth = [];
    year: any;
    month = [];
    realMonth:any = [];
    room: any = [];
    totalMoney: any = 0;
    object: any = {
        year: '',
        month: this.month,
        moneyMonth: this.moneyMonth,
    };
    catalogYear: any = [];
    list: any = [];
    moneyMonthFake:any =[];
    y:any=[];
    constructor(
        private adminService: AdminService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
        // console.log(this.month);
        // console.log(this.moneyMonth);
        let year = this.actRoute.snapshot.paramMap.get('year');
        this.year=year;
        this.getCatalog(year);
        // this.getCatalog1();
        this.drawChart();
    }

    getCatalog1() {
        this.adminService.getAllCatalog().subscribe(
            (catalog) => {
                this.catalog = catalog;
                // this.year.push(catalog[0].year);
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
                
                for (var m = 1; m < this.year.length; m++) {
                    console.log(this.year[m]);
                    for (var n = 0; n < this.catalog.length; n++) {
                        if (this.year[m] == this.catalog[n].year) {
                            this.catalogYear.push(this.catalog[n])
                        }
                    }
                    this.month.push(this.catalogYear[0].month);
                    for (var i = 1; i < this.catalogYear.length; i++) {
                        for (var j = 0; j < this.month.length; j++) {
                            if (this.catalogYear[i].month == this.month[j]) {
                                break;
                            }
                            if (this.catalogYear[i].month != this.month[j]) {
                                if (j == this.month.length - 1) {
                                    this.month.push(this.catalogYear[i].month);
                                    break;
                                }
                                continue;
                            }
                        }
                    }

                   

                    for (var i = 0; i < this.month.length; i++) {
                        var x = 0;
                        for (var j = 0; j < this.catalogYear.length; j++) {
                            if (this.catalogYear[j].month == this.month[i]) {
                                x += this.catalogYear[j].total;
                            }
                        }
                        this.moneyMonth.push(x);
                        x = 0;
                    }
                    
                    //  console.log(this.month);
                    //  console.log(this.moneyMonth);
                    this.object.year = this.year[m];
                    this.object.month = this.month;
                    this.object.moneyMonth = this.moneyMonth;
                    console.log(this.object);
                    this.list.push(this.object);
                    console.log(this.list);

                    // this.month = [];
                    // this.moneyMonth = [];
                    // console.log(this.list);
                    // console.log(this.moneyMonth);
                    // console.log(this.object);
                    // console.log(this.object);
                    // console.log(this.catalogYear);
                    break;
                }
            }
        );
    }

    drawChart() {
        // console.log(this.month);
        this.LineChart = new Chart('lineChart', {
            type: 'line',
            data: {
                labels: this.y,
                datasets: [{
                    label: 'Doanh thu',
                    data: this.moneyMonth,
                    fill: false,
                    lineTension: 0.2,
                    borderColor: "rgb(4, 113, 236)",
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    text: "Biểu Đồ Đường Đi",
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        this.BarChart = new Chart('barChart', {
            type: 'bar',
            data: {
                labels: this.y,
                datasets: [
                    {
                        label: "Doanh thu",
                        data: this.moneyMonth,
                        borderColor: '#3cba9f',
                        backgroundColor: [
                            "#3cb371",
                            "#0000FF",
                            "#9966FF",
                            "#4C4CFF",
                            "#00FFFF",
                            "#f990a7",
                            "#aad2ed",
                            "#FF00FF",
                            "Blue",
                            "Red",
                            "Blue"
                        ],
                        fill: true,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                },
                title: {
                    text: "Biểu Đồ Cột",
                    display: true
                },
            }
        });
    }

    getCatalog(year) {
        this.adminService.getCatalogFromYear(year).subscribe(
            (catalog) => {

                this.catalog = catalog;
                for (var m = 0; m < this.catalog.length; m++) {
                    if (this.catalog[m].year == this.year) {
                        if (this.catalog[m].month == 1) {
                            this.month1.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 2) {
                            this.month2.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 3) {
                            this.month3.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 4) {
                            this.month4.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 5) {
                            this.month5.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 6) {
                            this.month6.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 7) {
                            this.month7.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 8) {
                            this.month8.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 9) {
                            this.month9.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 10) {
                            this.month10.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 11) {
                            this.month11.push(this.catalog[m].room);
                        }
                        if (this.catalog[m].month == 12) {
                            this.month12.push(this.catalog[m].room);
                        }
                    }
                    // console.log(this.month1);
                }
                // console.log(this.catalog);
                // console.log(this.month);
                // console.log(this.moneyMonth);
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
                this.month.sort((a:any, b:any)=>{
                    return a-b
                });
                // console.log(this.month); 

                for (var i = 0; i < this.month.length; i++) {
                    var x = 0;
                    for (var j = 0; j < catalog.length; j++) {
                        if (catalog[j].month == this.month[i]) {
                            x += catalog[j].total;
                        }
                    }
                    this.moneyMonth.push(x);
                    this.moneyMonthFake.push(x);
                    x = 0;
                }

                for (var i = 0; i < this.moneyMonth.length; i++) {
                    this.totalMoney += this.moneyMonth[i];
                }
                this.totalMoney = this.numberWithCommas(this.totalMoney);
               
                // console.log(this.moneyMonth);

                for (var i = 0; i < this.moneyMonthFake.length; i++) {
                    this.moneyMonthFake[i] = this.numberWithCommas(this.moneyMonthFake[i]);
                }

                for( var i = 0; i<this.month.length; i++){
                    this.y.push('Tháng ' + this.month[i]);
                    // console.log(this.y);
                }
                

                // for (var i = 0; i < this.catalog.length; i++) {
                //     this.catalog[i].total = this.numberWithCommas(this.catalog[i].total);
                //     this.catalog[i].electricity_bill = this.numberWithCommas(this.catalog[i].electricity_bill);
                //     this.catalog[i].water_bill = this.numberWithCommas(this.catalog[i].water_bill);
                //     this.catalog[i].room_bill = this.numberWithCommas(this.catalog[i].room_bill);
                // }
            }
        );
    }

    numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

}
