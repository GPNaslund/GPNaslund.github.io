import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CommandPromptComponent } from '../command-prompt/command-prompt.component';
import { AboutComponent } from '../about/about.component';
import { InvalidInputComponent } from '../invalid-input/invalid-input.component';
import { HelpComponent } from '../help/help.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';
import { SnakeComponent } from '../../snake/snake.component';

@Component({
  selector: 'app-command-lines',
  standalone: true,
  imports: [CommandPromptComponent, AboutComponent, InvalidInputComponent, HelpComponent, SkillsComponent, ContactComponent],
  templateUrl: './command-lines.component.html',
  styleUrl: './command-lines.component.css'
})

export class CommandLinesComponent implements AfterViewInit {
  primaryPromptString: string = "root@gustavs-portfolio: $";
  currentCmdPrompt!: ComponentRef<CommandPromptComponent>
  @ViewChild("commandLines", { read: ViewContainerRef, static: true }) commandLines!: ViewContainerRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  handleCommandPromptInput(input: string) {
    switch (input.toLowerCase()) {
      case "clear":
        this.commandLines.clear();
        this.createCommandPrompt();
        break;
      case "about":
        this.createAboutComponent();
        break;
      case "help":
        this.createHelpComponent();
        break;
      case "skills":
        this.createSkillsComponent();
        break;
      case "contact":
        this.createContactComponent();
        break;
      case "email":
        window.location.href = "mailto:gpnaslund@gmail.com";
        this.createCommandPrompt();
        break;
      case "github":
        window.open("https://github.com/gpnaslund", "_blank")?.focus();
        this.createCommandPrompt();
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/gpnaslund", "_blank")?.focus();
        this.createCommandPrompt();
        break;
      case "snake":
        this.createSnakeComponent();
        break;
      default:
        this.createInvalidInputComponent();
        break;
    }
  }

  private createCommandPrompt() {
    const cmdPrompt = this.commandLines.createComponent(CommandPromptComponent);
    cmdPrompt.instance.primaryPromptString = this.primaryPromptString;
    cmdPrompt.instance.newPromptValueEvent.subscribe((value: string) => {
      this.handleCommandPromptInput(value);
    });
    if (this.currentCmdPrompt != undefined) {
      this.currentCmdPrompt.instance.isActive = false;
    }
    cmdPrompt.instance.isActive = true;
    this.currentCmdPrompt = cmdPrompt;
    this.cdr.detectChanges();
  }

  private createAboutComponent() {
    this.commandLines.createComponent(AboutComponent);
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  private createInvalidInputComponent() {
    this.commandLines.createComponent(InvalidInputComponent);
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  private createHelpComponent() {
    this.commandLines.createComponent(HelpComponent);
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  private createSkillsComponent() {
    this.commandLines.createComponent(SkillsComponent);
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  private createContactComponent() {
    this.commandLines.createComponent(ContactComponent);
    this.createCommandPrompt();
    this.cdr.detectChanges();
  }

  private createSnakeComponent() {
    const snake = this.commandLines.createComponent(SnakeComponent);
    snake.instance.width = this.commandLines.element.nativeElement.parentElement.offsetWidth;
    snake.instance.height = this.commandLines.element.nativeElement.parentElement.offsetHeight;
    snake.instance.newGameOver.subscribe(() => {
      this.createCommandPrompt();
    });
  }

}
