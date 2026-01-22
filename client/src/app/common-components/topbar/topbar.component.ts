import { Component,OnInit,HostListener  } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import { environment } from 'src/environments/environment';
import { MenuSearchComponent } from '../menu-search/menu-search.component';
import { DataService } from 'src/app/services/data.service';
import { CommonService } from 'src/app/services/common.service';
import { LanguageService } from 'src/app/services/language.service';
import { FontService } from 'src/app/services/font.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent  {

  isScrolled = true;
  homenavbar:boolean=true;
  menutype:boolean = false;
  backgroundImage: string = 'assets/home-mega-menu-bg.jpg';
  TopBarLogoIGKV: string = environment.PhotoUrl + 'home-igkv-main-logo-text.png';
  smallLogo:string=environment.PhotoUrl + 'home-footer-igkv-logo.png';
  isHomePage: boolean = true;
  showHover:boolean =true
  currentLanguage:string
  isHindi: boolean = false;  // Initially set to false for English logo

  // constructor(private com :CommonService,private ds:DataService,private route:Router,private dialog: MatDialog , private translate: TranslateService
  // ){
  //   translate.setDefaultLang('en');
  //   translate.use('en');
  // }

  constructor(private languageService: LanguageService,private ds:DataService,private route:Router,private dialog: MatDialog , private translate: TranslateService , private font:FontService,private theme:ThemeService){
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }


  switchLanguage(language: string): void {
    console.log(language);
    
    this.languageService.setLanguage(language);
    this.currentLanguage = language;
    this.isHindi = !this.isHindi;
    if (language === 'hn') {
      this.isHindi = true;
      // console.warn('called 1');
      
    } else {
      this.isHindi = false;
    }
  }


  ngOnInit(): void {
   
    this.route.events.subscribe((val: any) => {

      if(this.route.url === '/'){
        // console.warn("i am in homepage");
        this.isHomePage = true;
      }

      else{
        this.isHomePage = false;
        // console.warn("i am not in homepage");
        this.route.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            // console.log('Route change detected:', event.url);
            this.showHover = false;
            setTimeout(() => {
              this.showHover = true;
            }, 25);
            this.collapseNavbar();
          }
        });


      }
      if (val.url) {
        if (val.url.includes('/college/')) {
          this.menutype=false;
        } else if (val.url.includes('/kvk-home/kvk/')) {
          this.menutype=false;
        } else if (val.url.includes('/advisory')) {
          this.menutype=false;


           } else {
            this.menutype=true;
          }
      }
     
    });

    // this.getdata();
    // this.com.changeLanguage(1);
   
  }


  // translate(translationId: number): string {
  //   // console.log(translationId);
  //   return this.com.getTranslation(translationId);
    
  // }

  // changeLanguage(languageId: number) {
  //   this.com.changeLanguage(languageId);
  // }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // When page is scrolled more than 10px, the navbar background changes
    this.isScrolled = window.pageYOffset < 100;
  }
  
  // private setMenuType(type: string): void {
  //   // console.warn(`in ${type}`);
  //   this.menutype = type;
  // }


  // switchLanguage(language:string){
  //   console.log('tarnsalte',language);
    
  //   this.translate.use(language);
  // }
  
  collapseNavbar() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');  // Removes the 'show' class to collapse
    }
  }


  openSearchPopup(): void {
    const dialogRef = this.dialog.open(MenuSearchComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // You can handle any result after the popup is closed if needed
    });
  }

  // getdata(){
  //   this.ds.postapi(`homeDashboard/getLanguage/${1}`,null).subscribe((result:any)=>{
  //     console.log(result);
  //     console.log('language',result);
  //   })
  // }

// for reset font size 
increaseFont(){
 this.font.increaseFontSize();
}
decreaseFont(){
  this.font.decreaseFontSize();
}
resetFont() {
  this.font.resetFontSize();
}

toggleClass(className: string) {
  document.documentElement.classList.remove("high-contrast", "high-saturation", "low-saturation", "invert-colors");
  document.documentElement.classList.add(className);
}

resetFilters() {
  document.documentElement.classList.remove("high-contrast", "high-saturation", "low-saturation", "invert-colors");
}

//  big cursor --------------------------------------------
isBigCursor = false;

@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (this.isBigCursor) {
    const cursorSize = '50'; // Adjust size as needed
    document.documentElement.style.cursor = `url('data:image/svg+xml,\
      <svg xmlns="http://www.w3.org/2000/svg" width="${cursorSize}" height="${cursorSize}" viewBox="0 0 24 24">\
        <path d="M2 2 L10 22 L15 17 L22 20 L17 15 L22 10 Z" fill="black" stroke="white" stroke-width="2"/>\
      </svg>') 10 10, auto`;
  } else {
    document.documentElement.style.cursor = 'auto'; // Reset to normal cursor
  }
}

toggleBigCursor() {
  this.isBigCursor = !this.isBigCursor;
}

//  for hide image ------------------------------------------
isImagesHidden = false;

toggleImages() {
  this.isImagesHidden = !this.isImagesHidden;
  document.body.classList.toggle('hide-images', this.isImagesHidden);
}


}
