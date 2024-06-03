import { Component } from '@angular/core';
import { CommandPromptComponent } from './command-prompt/command-prompt.component';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommandPromptComponent],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})


export class TerminalComponent {
  primaryPromptString: string = "root@gustavs-portfolio: $ "
}
