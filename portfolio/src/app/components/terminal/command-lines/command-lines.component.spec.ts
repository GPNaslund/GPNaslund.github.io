import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLinesComponent } from './command-lines.component';

describe('CommandLinesComponent', () => {
  let component: CommandLinesComponent;
  let fixture: ComponentFixture<CommandLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
