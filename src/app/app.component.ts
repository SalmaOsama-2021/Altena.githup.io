import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from './translate-config.module'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateConfigModule,
    CommonModule,
    ClickOutsideDirective
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular-project';
  islang=false;
  currentLang="de";
  isMenuOpen = false;
  isScrolled = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 100; // Adjust the value as needed
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  constructor(public translate: TranslateService,private titleService: Title) {
    this.translate.setDefaultLang('en');
    this.titleService.setTitle('Altena');
  }
 
  switchLanguage(lang: string) {
    if(lang=="Deutsch"){
      lang="de";
    }else{
      lang="en";
     
    }
    console.log('Switching language to:', lang);
    this.translate.use(lang);
    this.currentLang = lang;
  }

  handleLanguageSwitch() {
    this.translate.get('currentLang').subscribe((translatedLang: string) => {
      this.switchLanguage(translatedLang);
    });
  }
   hideLanguagePopup() {
    this.islang = false;
  }
}
