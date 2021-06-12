import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Pipe } from '@angular/core';
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    catalog: any = [];
    status: boolean;
    pager: any = {};
    pagedItems: any[];
    loggedIn;
    constructor(
        private dataService: DataService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,
    ) { }

    ngOnInit() {
        this.loggedIn = this.adminService.user;
        console.log(this.loggedIn)
        if (this.loggedIn == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/login'));
        }
        this.getCatalog();
    }

    getCatalog() {
        this.dataService.getAllCatalog().subscribe(
            (catalog) => {
                this.catalog = catalog;
                for (var i = 0; i < this.catalog.length; i++) {
                    this.catalog[i].total = this.numberWithCommas(this.catalog[i].total);
                    this.catalog[i].electricity_bill = this.numberWithCommas(this.catalog[i].electricity_bill);
                    this.catalog[i].water_bill = this.numberWithCommas(this.catalog[i].water_bill);
                    this.catalog[i].room_bill = this.numberWithCommas(this.catalog[i].room_bill);
                }
                // console.log(this.catalog);
                // this.setPage(1);
            }
        );
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

    checkUser(people, id) {
        console.log(this.loggedIn)
        if (people == this.loggedIn.user.email) {
            this.ngZone.run(() => this.router.navigateByUrl(`/pay/${id}`));
        } else {
            alert("Bạn không có quyền truy cập vào tài khoản của người khác")
        }
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.dataService.getPager(this.catalog.length, page);

        // get current page of items
        this.pagedItems = this.catalog.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
