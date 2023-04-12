import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [ProblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(3));
    expect(prenom.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(200));
    expect(prenom.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let prenom = component.problemeForm.controls['prenom'];

    expect(prenom.valid).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue(' '.repeat(10));
    expect(prenom.valid).toBeFalsy();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue(' '.repeat(2) + 'a'.repeat(1));
    expect(prenom.valid).toBeFalsy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotifications('');

    let zone = component.problemeForm.get('telephone');

    expect(zone.status).toBeTruthy();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.gestionNotifications('');

    let zone = component.problemeForm.get('telephone');

    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotifications('');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotifications('');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.disabled).toBeTruthy();
  });
});
