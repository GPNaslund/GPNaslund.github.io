import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-command-prompt',
  standalone: true,
  imports: [],
  templateUrl: './command-prompt.component.html',
  styleUrl: './command-prompt.component.css'
})

export class CommandPromptComponent implements OnInit {
  @Input() primaryPromptString: string = ""
  @Output() promptValue: string = "";


  ngOnInit(): void {
    if (this.primaryPromptString == "") {
      throw new Error("Primary prompt string cannot be empty!");
    }
  }


}
