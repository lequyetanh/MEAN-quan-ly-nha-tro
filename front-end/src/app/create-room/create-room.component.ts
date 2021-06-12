import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

    roomForm : FormGroup;
    arrayRoom;
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,
    ) { }

    ngOnInit() {
        this.mainForm()
        this.getAllRoom()
    }

    mainForm() {
        this.roomForm = this.fb.group({
            id: [''],
            room: null,
            price: null,
            status: [''],
            user: ['']
        })
    }

    getAllRoom(){
        this.adminService.getAllRoom().subscribe(room => {
            this.arrayRoom = room;
            // console.log(this.arrayRoom);
            this.roomForm.setValue({
                id: this.arrayRoom[0].id + 1,
                room: null,
                price: null,
                status: 'empty',
                user: null
            });
        });
    }

    onSubmit(){

        this.roomForm.value.room  = parseInt(this.roomForm.value.room);
        this.roomForm.value.price  = parseInt(this.roomForm.value.price);
        console.log(this.roomForm.value)
        this.adminService.createRoom(this.roomForm.value).subscribe((res)=>{
            console.log('Room successfully created!');
            this.ngZone.run(() => this.router.navigateByUrl('/admin'))
        }, (error) => {
            console.log(error);
        });
    }

}
