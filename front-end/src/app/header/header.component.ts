import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    catalog: any;
    status: boolean;
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];
    loginForm: FormGroup;
    email = 'lequyetanh@gmail.com';
    password = '02081999';
    loggedIn;
    constructor(
        private dataService: DataService,
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,
    ) {
        // this.mainForm();
        this.adminService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            console.log(loggedIn)
            if(this.loggedIn == false){
                this.ngZone.run(() => this.router.navigateByUrl('/login'));
            }
        });
    }

    ngOnInit() {
        this.getCatalog();
    }

    getCatalog() {
        this.dataService.getAllCatalog().subscribe(
            (catalog) => {
                this.catalog = catalog;
            }
        );
    }

    doLogout() {
        this.adminService.logout();
    }

}
