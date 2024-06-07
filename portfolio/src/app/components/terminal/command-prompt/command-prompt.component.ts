import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-command-prompt',
  standalone: true,
  imports: [],
  templateUrl: './command-prompt.component.html',
  styleUrl: './command-prompt.component.css'
})

export class CommandPromptComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() primaryPromptString!: string;
  @Output() newPromptValueEvent = new EventEmitter<string>();
  @Input() isActive!: boolean;
  @ViewChild('inputElement') inputElementRef!: ElementRef;


  ngOnInit(): void {
    if (this.primaryPromptString == null || this.primaryPromptString == "") {
      throw new Error("Primary prompt string cannot be empty!");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputElementRef != undefined) {
      if (changes['isActive']) {
        this.setFocus();
      }
    }
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  setFocus() {
    if (this.isActive) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  onInputChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.newPromptValueEvent.emit(element.value);
  }

}
