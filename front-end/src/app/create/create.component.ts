import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    peopleForm: FormGroup;
    id: any = 1;
    room = [] ;
    today = new Date()
    time_end;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,

    ) {
        this.mainForm();
        this.getPeople();
    }

    ngOnInit() {
    }

    getAllRoom(){
        this.adminService.getAllRoom().subscribe(room => {
            for (var k = 0; k < room.length; k++) {
                this.room.push(room[k].room);
            }
            console.log(this.room);
            this.peopleForm.setValue({
                id: this.id,
                room: this.room[0],
                name: [''],
                time_thue: [''],
                time_start: this.today.getDate()+'-'+(this.today.getMonth()+1)+'-'+this.today.getFullYear(),
                time_end:  this.today.getDate()+'-'+(this.today.getMonth()+1 + parseInt(this.peopleForm.value.time_thue, 10))+'-'+this.today.getFullYear()
            });
        });
    }

    mainForm() {
        this.peopleForm = this.fb.group({
            id: [''],
            name: [''],
            room: [''],
            time_thue: [''],
            time_start: [''],
            time_end: ['']
        })
    }

    updateProfile(e) {
        this.peopleForm.get('people').setValue(e, {
            onlySelf: true
        })
    }

    getPeople() {
        this.adminService.getAllpeople().subscribe(data => {
            console.log(data[0]);
            if (data[0]==undefined) {
                this.id = 1;
            }
            else {
                this.id=data[0].id + 1;
                this.getAllRoom()
            }
        });
    }

    updateTime_end(){
        // console.log("hello world")
        // this.peopleForm.setValue({
            this.time_end = this.today.getDate()+'-'+(this.today.getMonth()+1 + parseInt(this.peopleForm.value.time_thue, 10))+'-'+this.today.getFullYear()
        // });

        // console.log(this.peopleForm.value.time_end)
    }

    onSubmit() {
        this.peopleForm.value.key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
        this.peopleForm.value.time_end = this.time_end;
        // console.log(this.peopleForm.value);
        this.adminService.getRoomFromName(this.peopleForm.value.room).subscribe(data=>{
            // console.log(data);
            data.status='occupy';
            console.log(data);
            this.adminService.updateRoom(data.id,data).subscribe(
                (res) => {
                    console.log('update room thành công!');
                }
            );
            this.adminService.createPeople(this.peopleForm.value).subscribe(
                (res) => {
                    console.log('People successfully created!');
                    this.ngZone.run(() => this.router.navigateByUrl('/admin'))
                }, (error) => {
                    console.log(error);
                });
        })
        
    }

}
