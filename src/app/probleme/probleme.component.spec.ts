import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;

  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemeComponent],

      imports: [ReactiveFormsModule, HttpClientModule],

      providers: [ProblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  }); //  it('should create', () => { //    expect(component).toBeTruthy(); //  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];

    prenom.setValue('a'.repeat(2));

    expect(prenom.valid).toBeFalse();
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
    let prenom = component.problemeForm.controls['prenom']; // prenom.setValue(''.repeat(0));

    expect(prenom.valid).toBeFalse();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let prenom = component.problemeForm.controls['prenom'];

    prenom.setValue(' '.repeat(10));

    expect(prenom.valid).toBeFalse();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let prenom = component.problemeForm.controls['prenom'];

    prenom.setValue(' '.repeat(2) + 'a'.repeat(1));

    expect(prenom.valid).toBeFalse();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotifications('');

    let zone = component.problemeForm.get('telephone');

    expect(zone.disabled).toBeTruthy();
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

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotifications('pasnotification');

    let zone = component.problemeForm.get('telephone');

    expect(zone.disabled).toBeTruthy();
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeFalsy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.disabled).toBeFalsy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue(null);

    expect(zone.valid).toBeFalse();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue(null);

    expect(zone.valid).toBeFalse();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue('dfasdfasdgfsf'.repeat(1));

    expect(zone.valid).toBeFalse();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide est invalide', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    let zoneConfirmer = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    let groupe = component.problemeForm.get('courrielGroup');

    zone.setValue(null);

    zoneConfirmer.setValue('samuel24lav@gmail.com'.repeat(1));

    expect(groupe.invalid).toBeTruthy();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    let zoneConfirmer = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    let groupe = component.problemeForm.get('courrielGroup');

    zone.setValue('samuel24lav@gmail.com');

    zoneConfirmer.setValue(null);

    expect(groupe.invalid).toBeTruthy();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    let zoneConfirmer = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    let groupe = component.problemeForm.get('courrielGroup');

    zone.setValue('samuel24lav@gmail.com');

    zoneConfirmer.setValue('test@gmail.com');

    expect(groupe.invalid).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    let zoneConfirmer = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    let groupe = component.problemeForm.get('courrielGroup');

    zone.setValue('samuel24lav@gmail.com');

    zoneConfirmer.setValue('samuel24lav@gmail.com');

    expect(groupe.valid).toBeTruthy();
  });
  it('#29 | Zone TELEPHONE est activ�e quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    expect(zone.disabled).toBeFalsy();
  });

  it('#30 | Zone ADRESSE COURRIEL est d�sactiv�e quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeTruthy();
  });

  it('#31 | Zone CONFIRMER COURRIEL est d�sactiv�e quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.disabled).toBeTruthy();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    zone.setValue('')

    expect(zone.valid).toBeFalsy();
  });  

  it('#33 | Zone TELEPHONE est invalide avec des caract�res non-num�riques quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    zone.setValue("agewahgre")

    expect(zone.valid).toBeFalsy();
  });  

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres cons�cutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    zone.setValue("000000000")

    expect(zone.valid).toBeFalsy();
  });  
  it('#34 | Zone TELEPHONE est invalide avec 11 chiffres cons�cutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    zone.setValue("00000000000")

    expect(zone.valid).toBeFalsy();
  });  

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres cons�cutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');

    zone.setValue("0000000000")

    expect(zone.valid).toBeTruthy();
  });  

});
