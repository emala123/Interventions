import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ITypeProbleme } from './probleme';

import { ProblemeService } from './probleme.service';

import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'inter-probleme',

  templateUrl: './probleme.component.html',

  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent {
  problemeForm: FormGroup;

  typeproblemeService: any;

  typesProbleme: ITypeProbleme[];

  errorMessage: string;

  produitForm: any;

  save(): void {}

  constructor(private fb: FormBuilder, private problemes: ProblemeService) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',

        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],

      noProbleme: ['', Validators.required],

      noTypeProbleme: ['', Validators.required],

      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],

        courrielConfirmation: [{ value: '', disabled: true }],
      }),

      telephone: [{ value: '', disabled: true }],

      pasnotification: [{ value: '', disabled: true }],
    });

    this.problemes.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),

      (error) => (this.errorMessage = <any>error)
    );
  }

  gestionNotifications(typeNotification: string): void {
    const courriel = this.problemeForm.get('courrielGroup.courriel');

    const courrielConfirmation = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    const telephone = this.problemeForm.get('telephone');

    const pasnotification = this.problemeForm.get('pasnotification');

    telephone.disable();
    courriel.disable
    courrielConfirmation.disable();
    pasnotification.disable();

    telephone.clearValidators();
    telephone.reset();
    telephone.disable();
    courriel.clearValidators();
    courriel.reset();
    courriel.disable();
    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();
    courrielConfirmation.disable();
    pasnotification.clearValidators();
    pasnotification.reset();
    pasnotification.disable();

    if (typeNotification === 'ParCourriel') {
      courriel.setValidators([
        Validators.required,

        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);

      courrielConfirmation.setValidators([
        Validators.required,

        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);

      courriel.enable();

      courrielConfirmation.enable(); // Si le validateur est dans un autre fichier l'écire sous la forme suivante : // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])

      courrielGroupControl.setValidators([
        Validators.compose([emailMatcherValidator.courrielDifferents()]),
      ]);
    } else {
      if (typeNotification === 'ParTelephone') {
        telephone.setValidators([Validators.required]);

        telephone.enable();
      }
    }
  }
}
