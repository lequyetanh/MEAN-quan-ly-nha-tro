
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.scss']
})
export class EditPeopleComponent implements OnInit {
    editForm: FormGroup;
    constructor(
        public fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private adminService: AdminService,
        private router: Router
    ) { }

    ngOnInit() {
        this.updatePeople();
        let id= this.actRoute.snapshot.paramMap.get('id');
        this.getPeople(id);
    }

    // Getter to access form control
    get myForm() {
        return this.editForm.controls;
    }

    updatePeople(){
        this.editForm = this.fb.group({
            id: [''],
            name: [''],
            room: [''],
            time_thue: [''],
            time_start: [''],
            time_end: ['']
        })
    }

    getPeople(id) {
        this.adminService.getPeopleFromId(id).subscribe(data => {
            // console.log(data);
            // console.log(data['id']);
            this.editForm.setValue({
                id: data["id"],
                name: data['name'],
                room: data['room'],
                time_thue: data['time_thue'],
                time_start: data['time_start'],
                time_end: data['time_end']
            });
        });  
    }

    onSubmit() {
        this.editForm.value.time_thue  = parseInt(this.editForm.value.time_thue);
        let id = this.actRoute.snapshot.paramMap.get('id');
        // console.log(this.editForm.value);
            this.adminService.updatePeople(id, this.editForm.value)
                .subscribe(res => {
                    alert("Content updated successfully!");
                    // this.router.navigateByUrl('/edit');
                    console.log('Content updated successfully!')
                }, (error) => {
                    console.log(error)
                })
    }

}
