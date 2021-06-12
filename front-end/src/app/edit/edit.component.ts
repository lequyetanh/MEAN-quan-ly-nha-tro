
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    editForm: FormGroup;
    total: any;
    constructor(
        public fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private adminService: AdminService,
        private router: Router,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
        this.updateCatalog();
        let id= this.actRoute.snapshot.paramMap.get('id');
        this.getCatalog(id);
    }

    // Getter to access form control
    get myForm() {
        return this.editForm.controls;
    }

    updateTotal(){
        this.total = this.editForm.value. electricity_bill + this.editForm.value.water_bill + this.editForm.value.room_bill
    }

    updateCatalog(){
        this.editForm = this.fb.group({
            id: [''],
            month: [''],
            year: [''],
            room: [''],
            people: [''],
            electricity_bill: [''],
            water_bill: [''],
            room_bill: [''],
            total: [''],
            status: ['']
        })
    }

    getCatalog(id) {
        this.adminService.getCatalogFromId(id).subscribe(data => {
            console.log(data);
            // console.log(data['id']);
            this.editForm.setValue({
                id: data["id"],
                month: data['month'],
                year: data['year'],
                room: data['room'],
                people: data['people'],
                electricity_bill: data['electricity_bill'],
                water_bill: data['water_bill'],
                room_bill: data['room_bill'],
                total: data['total'],
                status: data['status']
            });
        });  
    }

    onSubmit() {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.editForm.value.total = this.total;
        console.log(this.editForm.value);
            // this.adminService.updateCatalog(id, this.editForm.value)
            //     .subscribe(res => {
            //         // this.ngZone.run(() => this.router.navigateByUrl('/admin'))                       
            //         alert("Content updated successfully!");
            //         // this.router.navigateByUrl('/edit');
            //         console.log('Content updated successfully!')
            //     }, (error) => {
            //         console.log(error)
            //     })
            this.adminService.updateCatalog2(id, this.editForm.value)
                .subscribe(res => {
                    this.ngZone.run(() => this.router.navigateByUrl('/admin'))                       
                    alert("Content updated successfully!");
                    // this.router.navigateByUrl('/edit');
                    console.log('Content updated successfully!')
                }, (error) => {
                    console.log(error)
                })
    }

}