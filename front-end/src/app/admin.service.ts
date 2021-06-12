import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Injectable({
    providedIn: "root",
})
export class AdminService {
    loggedIn: Subject<boolean>;
    apiURL: string = "http://localhost:4000/api";
    catalogURL: string = "http://localhost:4000/money";
    peopleURL: string = "http://localhost:4000/people";
    roomURL: string = "http://localhost:4000/room";
    headers = new HttpHeaders().set("Content-Type", "application/json");
    user: any;

    constructor(private http: HttpClient, private toastr: ToastrService,
        private router: Router,
        private ngZone: NgZone,) {
        this.loggedIn = new Subject();
        this.getLogin();
    }

    doLogin(email: string, password: string) {
        this.http
            .post(
                `${this.apiURL}/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .subscribe(
                (resp: any) => {
                    // console.log(resp)
                    this.user = resp;
                    this.loggedIn.next(resp);
                    this.ngZone.run(() => this.router.navigateByUrl('/admin'));
                    this.toastr.success(
                        resp && resp.user && resp.user.name
                            ? `Welcome ${resp.user.name}`
                            : ""
                    );
                },
                (errorResp) => {
                    this.loggedIn.next(false);
                    errorResp.error
                        ? this.toastr.error(errorResp.error.errorMessage)
                        : this.toastr.error("An unknown error has occured.");
                }
            );
    }

    doLoginUser(email: string, password: string) {
        this.http
            .post(
                `${this.apiURL}/loginUser`,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .subscribe(
                (resp: any) => {
                    this.user = resp;
                    this.loggedIn.next(resp);
                    this.ngZone.run(() => this.router.navigateByUrl('/'));
                    this.toastr.success(
                        resp && resp.user && resp.user.name
                            ? `Welcome ${resp.user.name}`
                            : ""
                    );
                },
                (errorResp) => {
                    this.loggedIn.next(false);
                    errorResp.error
                        ? this.toastr.error(errorResp.error.errorMessage)
                        : this.toastr.error("An unknown error has occured.");
                }
            );
    }

    getLogin() {
        this.http
            .get(`${this.apiURL}/login`, {
                withCredentials: true, // <=========== important!
            })
            .subscribe(
                (resp: any) => {
                    this.loggedIn.next(resp.loggedIn);
                },
                (errorResp) => {
                    this.toastr.error(
                        "Oops, something went wrong getting the logged in status"
                    );
                }
            );
    }

    logout() {
        this.http
            .post(
                `${this.apiURL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            )
            .subscribe(() => {
                this.loggedIn.next(false);
                this.ngZone.run(() => this.router.navigateByUrl('/login'))
            });
    }

    // Get all catalog
    getAllCatalog(): Observable<any> {
        return this.http.get(`${this.catalogURL}`);
    }

    getFavorite(): Observable<any> {
        return this.http.get(`${this.apiURL}/favorite`);
    }

    // Create
    addFavorite(data: any): Observable<any> {
        console.log(data);
        let url = `${this.apiURL}/addFavorite`;
        // console.log(data);
        return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    // filter
    filter(data: any): Observable<any> {
        return this.http.get(`${this.catalogURL}/filter`);
    }

    getCatalogFromYear(year: number): Observable<any> {
        // console.log(this.http.get(`${this.catalogURL}/edit/${id}`));
        return this.http
            .get(`${this.catalogURL}/chart/${year}`, { headers: this.headers })
            .pipe(
                map((res: Response) => {
                    return res || {};
                }),
                catchError(this.errorMgmt)
            );
    }

    // Get all room
    getAllRoom(): Observable<any> {
        return this.http.get(`${this.roomURL}`);
    }

    // Get all people
    getAllpeople() {
        return this.http.get(`${this.peopleURL}`);
    }

    getCatalogFromId(id: number): Observable<any> {
        // console.log(this.http.get(`${this.catalogURL}/edit/${id}`));
        return this.http
            .get(`${this.catalogURL}/edit/${id}`, { headers: this.headers })
            .pipe(
                map((res: Response) => {
                    return res || {};
                }),
                catchError(this.errorMgmt)
            );
    }

    getRoomFromName(name: number): Observable<any> {
        // console.log(this.http.get(`${this.catalogURL}/edit/${id}`));
        return this.http
            .get(`${this.roomURL}/get/${name}`, { headers: this.headers })
            .pipe(
                map((res: Response) => {
                    return res || {};
                }),
                catchError(this.errorMgmt)
            );
    }

    getPeopleFromId(id: number): Observable<any> {
        // console.log(this.http.get(`${this.catalogURL}/edit/${id}`));
        return this.http
            .get(`${this.peopleURL}/edit/${id}`, { headers: this.headers })
            .pipe(
                map((res: Response) => {
                    return res || {};
                }),
                catchError(this.errorMgmt)
            );
    }

    // Create
    createPeople(data: any): Observable<any> {
        let url = `${this.peopleURL}/create`;
        // console.log(data);
        return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    // Create
    createRoom(data: any): Observable<any> {
        let url = `${this.roomURL}/create`;
        // console.log(data);
        return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    // Create
    createCatalog(data: any): Observable<any> {
        let url = `${this.catalogURL}/create`;
        // console.log(data);
        return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    // Delete employee
    deletePeople(id: any): Observable<any> {
        let url = `${this.peopleURL}/delete/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    deletePeopleFromName(name: any): Observable<any> {
        let url = `${this.peopleURL}/deleteUserFromName/${name}`;
        return this.http
            .delete(url, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }


    // Delete catalog
    deleteCatalog(id: any): Observable<any> {
        let url = `${this.catalogURL}/delete/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Delete room
    deleteRoom(room: any): Observable<any> {
        let url = `${this.roomURL}/delete/${room}`;
        return this.http
            .delete(url, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Update catalog
    updateCatalog(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.catalogURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Update catalog
    updateCatalog2(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.catalogURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Update room
    updateRoom(id, data): Observable<any> {
        // console.log(id,data);
        let url = `${this.roomURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Update People
    updatePeople(id, data): Observable<any> {
        console.log(id, data);
        let url = `${this.peopleURL}/update/${id}`;
        return this.http
            .put(url, data, { headers: this.headers })
            .pipe(catchError(this.errorMgmt));
    }

    // Error handling
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getPager(
        totalItems: number,
        currentPage: number = 1,
        pageSize: number = 10
    ) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
            (i) => startPage + i
        );

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
        };
    }
}
