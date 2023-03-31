import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères',()=>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2))
    expect(prenom.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères',() =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(3));
    expect(prenom.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères',() =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(200));
    expect(prenom.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur',() =>{
    let prenom = component.problemeForm.controls['prenom'];
  
    expect(prenom.valid).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces',() =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue(' '.repeat(10));
    expect(prenom.valid).toBeFalsy();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère',() =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue(' '.repeat(2) + 'a'.repeat(1));
    expect(prenom.valid).toBeFalsy();
  });



});
