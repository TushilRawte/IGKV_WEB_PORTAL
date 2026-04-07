
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
   private supportedLanguages = ['en', 'hn', 'uz'];

  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private translate: TranslateService) {

    const savedLanguage = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string): void {

    // fallback if invalid language
    if (!this.supportedLanguages.includes(language)) {
      language = 'en';
    }

    this.currentLanguageSubject.next(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}