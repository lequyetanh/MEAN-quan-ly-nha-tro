import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
    editForm: FormGroup;
    constructor(
        public fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private adminService: AdminService,
        private router: Router
    ) { }

    ngOnInit() {
        this.updateCatalog();
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.getCatalog(id);
    }

    // Getter to access form control
    get myForm() {
        return this.editForm.controls;
    }

    updateCatalog(){
        this.editForm = this.fb.group({
            id: [''],
            month: [''],
            room: [''],
            people: [''],
            electricity: [''],
            water: [''],
            roomBill: [''],
            total: [''],
            status: ['']
        })
    }

    getCatalog(id) {
        this.adminService.getCatalogFromId(id).subscribe(data => {
            // console.log(data);
            // console.log(data['id']);
            this.editForm.setValue({
                id: data["id"],
                month: data['month'],
                room: data['room'],
                people: data['people'],
                electricity: data['electricity_bill'],
                water: data['water_bill'],
                roomBill: data['room_bill'],
                total: data['total'],
                status: "Charge"
            });
        });  
    }

    onSubmit() {
        let id = this.actRoute.snapshot.paramMap.get('id');
        // console.log(this.editForm.value);
            this.adminService.updateCatalog(id, this.editForm.value)
                .subscribe(res => {
                    alert("Check In Successfully!");
                    this.router.navigateByUrl('/');
                    console.log('Content updated successfully!')
                }, (error) => {
                    console.log(error)
                })
    }

}