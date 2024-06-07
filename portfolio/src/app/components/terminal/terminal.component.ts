import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandLinesComponent } from './command-lines/command-lines.component';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, CommandLinesComponent],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})


export class TerminalComponent {
  @Input() primaryPromptString: string = "";

}
