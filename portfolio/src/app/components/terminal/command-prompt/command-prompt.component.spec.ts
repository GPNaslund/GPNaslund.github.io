import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPromptComponent } from './command-prompt.component';

describe('CommandPromptComponent', () => {
  let component: CommandPromptComponent;
  let fixture: ComponentFixture<CommandPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
