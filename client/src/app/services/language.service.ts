
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Set default language
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
    this.translate.use(language);
    localStorage.setItem('language', language); 
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  } 

 


}


