import { Component, OnInit } from "@angular/core";
import { AdminService } from "./../admin.service";
import { Router } from "@angular/router";
import { NgZone } from "@angular/core";
import { ArrayType } from "@angular/compiler";

@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
    styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent implements OnInit {
    favorite: any;
    constructor(
        private adminService: AdminService,
        private router: Router,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        this.getFavorite();
    }

    getFavorite() {
        console.log("favorite");
        this.adminService.getFavorite().subscribe((favorite) => {
            this.favorite = favorite;
            console.log(this.favorite);
            console.log("favorite");
        });
    }
}
