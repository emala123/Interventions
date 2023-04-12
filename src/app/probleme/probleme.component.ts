import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  save(): void {}

  constructor(private fb: FormBuilder, private problemes: ProblemeService) {}
  ngOnInit() {
    this.problemeForm = this.fb.group({
      //prenom: ['',[Validators.minLength(3),Validators.required]]
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: [
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
    });

    this.problemes.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }
  gestionNotifications(typesProbleme: string): void {
    const telephone = this.problemeForm.get('telephone');
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );

    // Tous remettre � z�ro
    telephone.clearValidators();
    telephone.reset(); // Pour enlever les messages d'erreur si le controle contenait des donn�es invaldides
    telephone.disable();

    courriel.clearValidators();
    courriel.reset();
    courriel.disable();

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();
    courrielConfirmation.disable();

  }
}
