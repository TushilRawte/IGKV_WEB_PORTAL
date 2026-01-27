import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // title = 'Temp-new';

  isShowScrollToTop = false;
  topPosToStartShowing = 600;

  showAdmissionPopup = false; // controls popup visibility
  popupHideScrollThreshold = 300;
  currentUrl = '';

  private previousRoute: string | null = null;
  private lastNavigatedWithFragment = false;

  constructor(private translate: TranslateService, private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.currentUrl = currentRoute;

        const currentFragment = this.router.routerState.snapshot.root.fragment;

        if (currentFragment) {
          this.lastNavigatedWithFragment = true;
        } else if (this.lastNavigatedWithFragment) {
          this.lastNavigatedWithFragment = false;
          return;
        }

        if (!this.shouldScroll(currentRoute)) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        }

        this.previousRoute = currentRoute;

        // 👉 Set initial popup state based on route
        this.showAdmissionPopup = this.shouldShowPopupOnRoute(this.currentUrl);
      }
    });
  }

  private shouldScroll(currentRoute: string): boolean {
    return currentRoute.includes('#');
  }

  private shouldShowPopupOnRoute(url: string): boolean {
    return url === '/' || url === '/home'; // Customize routes as needed
  }

  onActivate() {
    window.scroll(0, 0);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  isChatbotOpen = false;

  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;

    // 👉 Scroll to Top Button logic
    this.isShowScrollToTop = scrollPosition >= this.topPosToStartShowing;

    // 👉 Admission Popup Scroll logic
    if (this.shouldShowPopupOnRoute(this.currentUrl)) {
      this.showAdmissionPopup = scrollPosition < this.popupHideScrollThreshold;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  onApply() {
    window.open('https://igkv.ac.in/counselinghomenew.aspx', '_blank'); // Update to actual apply link
  }
}
