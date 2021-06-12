import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularmovie';
  scrollTop() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  @HostListener('window:scroll', ['$event']) scrollHandler(event) {
    const height = window.scrollY;
    const el = document.getElementById('btn-returnToTop');
    height >= 500 ? el.className = 'show' : el.className = 'hide';
  }
}
