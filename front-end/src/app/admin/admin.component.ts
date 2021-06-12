import { Component, OnInit } from '@angular/core';
import { AdminService } from './../admin.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ArrayType } from '@angular/compiler';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    fuck: any = true;
    loggedIn;
    list: any = [];
    catalogYear: any = [];
    people: any;
    catalog: any;
    status: boolean;
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];
    moneyMonth = [];
    month = [];
    year = [];
    room: any = [];
    roomOccupy: any = [];
    arrayRoom: any = [];
    object: any = {
        year: '',
        month: this.month,
        moneyMonth: this.moneyMonth,
    };
    totalMoney: any = 0;
    constructor(
        private adminService: AdminService,
        private router: Router,
        private ngZone: NgZone,
    ) {
        this.adminService.loggedIn.subscribe(loggedIn => {
            // console.log(loggedIn)
            this.loggedIn = loggedIn;
            if (this.loggedIn == false) {
                this.ngZone.run(() => this.router.navigateByUrl('/'));
            }
        });
    }

    ngOnInit() {

        this.getPeople();
        this.getCatalog();
        this.getRoom();
    }

    removeRoom(room, user) {
        this.adminService.deleteRoom(room).subscribe((res) => {
            console.log(res)
            if (user) {
                this.adminService.deletePeopleFromName(user).subscribe((res) => {
                    console.log(res)
                    this.getPeople();
                    this.getRoom();
                })
            } else {
                this.getPeople();
                this.getRoom();
            }
        })
    }

    getRoom() {
        this.adminService.getAllpeople().subscribe(roomOccupy => {
            for (var m = 0; m < Object(roomOccupy).length; m++) {
                this.roomOccupy.push(roomOccupy[m].room);
            }
            this.adminService.getAllRoom().subscribe(room => {
                for (var k = 0; k < room.length; k++) {
                    this.room.push(room[k].room);
                }
            });
        });
        this.adminService.getAllRoom().subscribe(room => {
            this.arrayRoom = room;
            // console.log(this.arrayRoom);
        });
    }

    getCatalog() {
        this.adminService.getAllCatalog().subscribe(
            (catalog) => {
                this.catalog = catalog;
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
                for (var i = 0; i < this.catalog.length; i++) {
                    this.totalMoney += this.catalog[i].total;
                }
                this.totalMoney = this.numberWithCommas(this.totalMoney);
                for (var m = 1; m < this.year.length; m++) {
                    // console.log(this.year[m]);
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
                    // console.log(this.object);
                    this.list.push(this.object);
                    // console.log(this.list);

                    // this.month = [];
                    // this.moneyMonth = [];
                    // console.log(this.list);
                    // console.log(this.moneyMonth);
                    // console.log(this.object);
                    // console.log(this.object);
                    // console.log(this.catalogYear);
                    break;
                }

                this.setPage(1);
                for (var i = 0; i < this.catalog.length; i++) {
                    this.catalog[i].total = this.numberWithCommas(this.catalog[i].total);
                    this.catalog[i].electricity_bill = this.numberWithCommas(this.catalog[i].electricity_bill);
                    this.catalog[i].water_bill = this.numberWithCommas(this.catalog[i].water_bill);
                    this.catalog[i].room_bill = this.numberWithCommas(this.catalog[i].room_bill);
                }
            }
        );
    }

    getCatalog1() {
        this.adminService.getAllCatalog().subscribe(catalog => {
            var localYear: any[];
            var localMonth: any[];
            var localMoneyMonth: any[];
            this.catalog = catalog;
            localYear.push(catalog[0].year);
            for (var i = 1; i < catalog.length; i++) {
                for (var j = 0; j < localYear.length; j++) {
                    if (catalog[i].year == localYear[j]) {
                        break;
                    }
                    if (catalog[i].year != localYear[j]) {
                        if (j == localYear.length - 1) {
                            localYear.push(catalog[i].year);
                            break;
                        }
                        continue;
                    }
                }
            }

            console.log(this.year);
            // for (var i = 0; i < this.catalog.length; i++) {
            //     this.totalMoney += this.catalog[i].total;
            // }
            // this.totalMoney = this.numberWithCommas(this.totalMoney);
            // for (var m = 0; m < this.year.length; m++) {
            //     console.log(this.year[m]);
            //     for (var n = 0; n < this.catalog.length; n++) {
            //         if (this.year[m] == this.catalog[n].year) {
            //             this.catalogYear.push(this.catalog[n])
            //         }
            //     }
            //     this.month.push(this.catalogYear[0].month);
            //     for (var i = 1; i < this.catalogYear.length; i++) {
            //         for (var j = 0; j < this.month.length; j++) {
            //             if (this.catalogYear[i].month == this.month[j]) {
            //                 break;
            //             }
            //             if (this.catalogYear[i].month != this.month[j]) {
            //                 if (j == this.month.length - 1) {
            //                     this.month.push(this.catalogYear[i].month);
            //                     break;
            //                 }
            //                 continue;
            //             }
            //         }
            //     }

            //     for (var i = 0; i < this.month.length; i++) {
            //         var x = 0;
            //         for (var j = 0; j < this.catalogYear.length; j++) {
            //             if (this.catalogYear[j].month == this.month[i]) {
            //                 x += this.catalogYear[j].total;
            //             }
            //         }
            //         this.moneyMonth.push(x);
            //         x = 0;
            //     }
            //     //  console.log(this.month);
            //     //  console.log(this.moneyMonth);
            //     this.object.year = this.year[m];
            //     this.object.month = this.month;
            //     this.object.moneyMonth = this.moneyMonth;
            //     console.log(this.object);
            //     this.list.push(this.object);
            //     console.log(this.list);

            //     this.month = [];
            //     this.moneyMonth = [];
            //     // console.log(this.list);
            //     // console.log(this.moneyMonth);
            //     // console.log(this.object);
            //     // console.log(this.object);
            //     // console.log(this.catalogYear);
            //     continue;
            // }

            // this.setPage(1);
            // for (var i = 0; i < this.catalog.length; i++) {
            //     this.catalog[i].total = this.numberWithCommas(this.catalog[i].total);
            //     this.catalog[i].electricity_bill = this.numberWithCommas(this.catalog[i].electricity_bill);
            //     this.catalog[i].water_bill = this.numberWithCommas(this.catalog[i].water_bill);
            //     this.catalog[i].room_bill = this.numberWithCommas(this.catalog[i].room_bill);
            // }
        }
        );
    }

    numberWithCommas(x: string) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    getPeople() {
        this.adminService.getAllpeople().subscribe(
            (people) => {
                this.people = people;
            }
        );
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.adminService.getPager(this.catalog.length, page);

        // get current page of items
        this.pagedItems = this.catalog.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    removePeople(id: number): void {
        var result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.adminService.getPeopleFromId(id).subscribe(data => {
                var room = data.room;
                this.adminService.getRoomFromName(room).subscribe(data1 => {
                    // console.log(data1);
                    data1.status = 'empty';
                    data1.user = null;
                    // console.log(data1);
                    this.adminService.updateRoom(data1.id, data1).subscribe(
                        (res) => {
                            console.log('update room thành công!');
                        }
                    );
                    this.adminService.deletePeople(id).subscribe(
                        (res) => {
                            console.log('People successfully delete!');
                            this.getPeople();
                            this.getRoom();
                            // alert("Đã xóa thành công!");
                            // location.reload();
                        }, (error) => {
                            console.log(error);
                        });
                })

            });

        }

    }

    removeCatalog(id: number): void {
        var result = confirm("Bạn có chắc chắn muốn xóa không?");
        if (result == false) {
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }
        else {
            this.adminService.deleteCatalog(id).subscribe(
                (res) => {
                    console.log('Catalog successfully delete!');
                    // window.location.reload();
                    // this.reset();
                    // alert("Đã xóa thành công!");
                    this.getCatalog();
                }, (error) => {
                    console.log(error);
                });
        }
    }

    onSubmit() {
        this.fuck = false;
    }

    onClick(id) {
        this.adminService.getCatalogFromId(id).subscribe(data => {
            this.adminService.addFavorite(data).subscribe();
        });
    }
}
