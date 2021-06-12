import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from './../admin.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    email = 'lequyetanh@gmail.com';
    password = '02081999';
    loggedIn = false;
    allUser: any;
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private adminService: AdminService,
    ) {
        // this.mainForm();
        // window.location.reload();
        this.adminService.loggedIn.subscribe(loggedIn => {
            console.log(loggedIn)
            this.loggedIn = loggedIn;
        });
    }

    ngOnInit() {
        this.getPeople();
    }

    getPeople() {
        this.adminService.getAllpeople().subscribe(
            (people) => {
                console.log(people)
                this.allUser = people;
                // console.log(this.allUser.length)
            }
        );
    }

    mainForm() {
        this.loginForm = this.fb.group({
            name: [''],
            password: [''],
        })
    }

    // onSubmit() {
    //     // console.log(this.loginForm.value.name);
    //     if (this.loginForm.value.name == "lequyetanh" && this.loginForm.value.password == "02081999") {
    //         this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    //     }
    //     else {
    //         alert("Wrong useName or Password. please do that again!");
    //     }
    // }

    doLogin() {
        this.password.toString();
        console.log(this.email, this.password);
        if (this.email == 'lequyetanh@gmail.com' && this.password == '02081999') {
            this.adminService.doLogin(this.email, this.password);
        } else {
            // console.log("ahihi")
            for (let i = 0; i < Object(this.allUser).length; i++) {
                // console.log(this.allUser[i])
                if (this.email == this.allUser[i].name && this.password == this.allUser[i].key) {
                    console.log("successful")
                    this.adminService.doLoginUser(this.email, this.password);
                    break;
                } else {
                    if (i == this.allUser.length - 1) {
                        alert("Sai Tên hoặc Mật Khẩu");
                    }
                    continue;
                }
            }
        }
    }

    doLogout() {
        this.adminService.logout();
    }

}
