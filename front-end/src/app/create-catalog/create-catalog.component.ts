import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-create-catalog',
    templateUrl: './create-catalog.component.html',
    styleUrls: ['./create-catalog.component.scss']
})
export class CreateCatalogComponent implements OnInit {
    catalogForm: FormGroup;
    human: any ='Lê Quyết Anh';
    lock: any = [];
    index: any = 1;
    month: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    room: any = [];
    status: any = ["Charge", "No Charge"];
    allRoom: any = [];

    tienPhong: any;
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,

    ) {
        this.mainForm();
        this.getCatalog();
    }

    getAllRoom(){
        this.adminService.getAllRoom().subscribe(room => {
            this.allRoom = room;
        });
    }

    ngOnInit() {
        this.getPeople();

    }

    getCatalog() {
        this.adminService.getAllCatalog().subscribe(data => {
            if(data){
                this.index = data[0].id + 1;
            }
            else{
                this.index=1;
            }
        });
    }

    mainForm() {
        this.catalogForm = this.fb.group({
            id: [''],
            month: [''],
            year: [''],
            room: [''],
            people: [''],
            electricity_bill: [''],
            water_bill: [''],
            room_bill: [''],
            status: [''],
        })
    }

    // Choose options with select-dropdown
    // updateProfile(e) {
    //     this.catalogForm.get('people').setValue(e, {
    //         onlySelf: true
    //     })
    // }

    updateMonth(e) {
        this.catalogForm.get('month').setValue(e, {
            onlySelf: true
        })
    }

    updateStatus(e) {
        this.catalogForm.get('status').setValue(e, {
            onlySelf: true
        })
    }

    // Getter to access form control
    get myForm() {
        return this.catalogForm.controls;
    }

    // Choose options with select-dropdown
    updateRoom(e) {
        this.catalogForm.get('room').setValue(e, {
            onlySelf: true
        })
        console.log(e);
        for(let i=0; i<this.allRoom.length;i++){
            if(this.allRoom[i].room == parseInt(e)){
                this.catalogForm.get('room_bill').setValue(this.allRoom[i].price)
                console.log(this.tienPhong)
            }
        }
    }

    getPeople() {
        this.adminService.getAllpeople().subscribe(data => {
            this.adminService.getAllRoom().subscribe(roomReturn => {
                this.allRoom = roomReturn;
                for (let i = 0; i < Object(data).length; i++) {
                    this.lock.push(data[i].name);
                    this.room.push(data[i].room);
                }
                // console.log(this.lock, this.room);
                for (let i = 0; i < Object(this.allRoom).length; i++) {
                    if(this.allRoom[i].room == this.room[0]){
                        console.log(this.allRoom[i].room)
                        this.tienPhong = this.allRoom[i].price;
                        this.catalogForm.setValue({
                            id: this.index,
                            month: this.month[0],
                            year: [''],
                            room: this.room[0],
                            people: this.lock[0],
                            electricity_bill: [''],
                            water_bill: [''],
                            room_bill: this.allRoom[i].price,
                            status: this.status[0],
                        });
                    }
                }
            });
            // console.log(data);
        });
    }

    soDienNuoc() {
        this.getCatalog();
    }

    onSubmit() {
        console.log(this.catalogForm.value);
        this.adminService.getAllpeople().subscribe(data1 => {
            for(var i=0; i< Object(data1).length; i++){
                if(data1[i].room==this.catalogForm.value.room){
                    console.log(data1[i].name);
                    this.catalogForm.value.people=data1[i].name;
                    console.log(this.catalogForm.value.people);
                }
            }
        })

        this.adminService.getAllCatalog().subscribe(data => {
            var a = this.catalogForm.value.people;
            var b = 0;
            var c = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].people === a) {
                        b += data[i].electricity_bill / 3000;
                }
                if (data[i].people === a) {
                        c += data[i].water_bill / 10000;
                }
            }
            this.catalogForm.value.electricity_bill -= b;
            this.catalogForm.value.water_bill -= c;
            
            console.log(this.catalogForm.value);
            // this.catalogForm.value.people
            this.adminService.createCatalog(this.catalogForm.value).subscribe(
            (res) => {
                console.log('People successfully created!')
                this.ngZone.run(() => this.router.navigateByUrl('/admin'))
            }, (error) => {
                console.log(error);
            });
        });
    }

}
