import { CommonModule } from '@angular/common';
import { OnInit, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, AfterViewInit {
  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.checkDarkMode();
  }

  ngAfterViewInit(): void {
    this.addDarkModeListener();
  }

  private checkDarkMode() {
    if (window.matchMedia) {
      const query = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkMode = query.matches;
    }
  }

  private addDarkModeListener(): void {
    if (window.matchMedia) {
      const query = window.matchMedia('(prefers-color-scheme: dark)');
      query.addEventListener('change', (event) => {
        this.isDarkMode = event.matches;
      });
    }
  }

}
