import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from './../data.service';

@Component({
    selector: 'app-page-pay',
    templateUrl: './page-pay.component.html',
    styleUrls: ['./page-pay.component.scss']
})
export class PagePayComponent implements OnInit {
    start: any = false;
    process: any =false;
    pager: any = {};
    pagedItems: any[];
    searchForm: FormGroup;
    status: any = [];
    year: any = [];
    room: any = [];
    people: any = [];
    month: any = [];
    list: any = [];
    array: any = [];
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,
        private dataService: DataService,
    ) { }

    ngOnInit() {
        this.mainForm();
        this.getData();
        this.setValue();
    }

    mainForm() {
        this.searchForm = this.fb.group({
            status: [''],
            year: [''],
            room: [''],
            people: [''],
            month: [''],
        })
    }

    // Getter to access form control
    get myForm() {
        return this.searchForm.controls;
    }

    updateStatus(e) {
        this.searchForm.get('status').setValue(e, {
            onlySelf: true
        })
    }

    updateYear(e) {
        this.searchForm.get('year').setValue(e, {
            onlySelf: true
        })
    }

    updateRoom(e) {
        this.searchForm.get('room').setValue(e, {
            onlySelf: true
        })
    }

    updatePeople(e) {
        this.searchForm.get('people').setValue(e, {
            onlySelf: true
        })
    }

    updateMonth(e) {
        this.searchForm.get('month').setValue(e, {
            onlySelf: true
        })
    }

    getData() {
        this.adminService.getAllCatalog().subscribe(data => {
            this.month.push(data[0].month);
            this.year.push(data[0].year);
            this.status.push(data[0].status);
            for (var i = 1; i < data.length; i++) {
                for (var j = 0; j < this.month.length; j++) {
                    if (data[i].month == this.month[j]) {
                        break;
                    }
                    if (data[i].month != this.month[j]) {
                        if (j == this.month.length - 1) {
                            this.month.push(data[i].month);
                            break;
                        }
                        continue;
                    }
                }
               
                for (var j = 0; j < this.year.length; j++) {
                    if (data[i].year == this.year[j]) {
                        break;
                    }
                    if (data[i].year != this.year[j]) {
                        if (j == this.year.length - 1) {
                            this.year.push(data[i].year);
                            break;
                        }
                        continue;
                    }
                }
                
                for (var j = 0; j < this.status.length; j++) {
                    if (data[i].status == this.status[j]) {
                        break;
                    }
                    if (data[i].status != this.status[j]) {
                        if (j == this.status.length - 1) {
                            this.status.push(data[i].status);
                            break;
                        }
                        continue;
                    }
                }
                
            }
            this.month.unshift("Chọn tất");
            this.status.unshift("Chọn tất");
            this.year.unshift("Chọn tất");

        });
        this.adminService.getAllpeople().subscribe(data => {
            for (var i = 0; i < Object(data).length; i++) {
                this.people.push(data[i].name);
                this.room.push(data[i].room);
            }
            this.people.unshift("Chọn tất");
            this.room.unshift("Chọn tất");
            console.log(this.room);
            this.searchForm.setValue({
                month: this.month[0],
                year: this.year[0],
                room: this.room[0],
                people: this.people[0],
                status: this.status[0],
            });

            this.onSubmit();
        });
        // console.log(this.month);
    }

    setValue() {

    }

    onSubmit() {
        this.array = [];
        this.list = [];
        this.start=true;
        // console.log(this.array);
        // console.log(this.searchForm.value);     
        this.adminService.getAllCatalog().subscribe(data => {
            if (this.searchForm.value.month != 'Chọn tất') {
                this.array.push('month');
            }
            if (this.searchForm.value.year != 'Chọn tất') {
                this.array.push('year');
            }
            if (this.searchForm.value.room != 'Chọn tất') {
                this.array.push('room');
            }
            if (this.searchForm.value.people != 'Chọn tất') {
                this.array.push('people');
            }
            if (this.searchForm.value.status != 'Chọn tất') {
                this.array.push('status');
            }
            // console.log(this.array);

            if(this.array[0]==undefined){
                this.list=data;
                this.process=true;
                this.setPage(1);
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].total = this.numberWithCommas(this.list[i].total);
                    this.list[i].electricity_bill = this.numberWithCommas(this.list[i].electricity_bill);
                    this.list[i].water_bill = this.numberWithCommas(this.list[i].water_bill);
                    this.list[i].room_bill = this.numberWithCommas(this.list[i].room_bill);
                }
            }else{
                for (var j = 0; j < data.length; j++) {
                    for (var i = 0; i < this.array.length; i++) {
                        if (data[j][this.array[i]] == this.searchForm.value[this.array[i]]) {
                            if (i == this.array.length - 1) {
                                this.list.push(data[j]);
                                break;
                            }
                            continue;
                        } else {
                            break;
                        }
                    }
                }
                this.process=true;
                if(this.list[0]==undefined){
                    this.process=false;
                    // console.log(this.button);
                    // console.log(this.list);
                }
                this.setPage(1);
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].total = this.numberWithCommas(this.list[i].total);
                    this.list[i].electricity_bill = this.numberWithCommas(this.list[i].electricity_bill);
                    this.list[i].water_bill = this.numberWithCommas(this.list[i].water_bill);
                    this.list[i].room_bill = this.numberWithCommas(this.list[i].room_bill);
                }
            }

            // console.log(this.list);
            // window.location.reload();

            // console.log(this.array);
        });
    }

    numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.dataService.getPager(this.list.length, page);
    
        // get current page of items
        this.pagedItems = this.list.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
                    window.location.reload();
                    // this.reset();
                    alert("Đã xóa thành công!");
                }, (error) => {
                    console.log(error);
                });
        }
    }
}
