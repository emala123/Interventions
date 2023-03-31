import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });

      it('#8 | Une phrase avec des mots est valide', () => {
        //let control = { value: 'Vive angular'.repeat(1)}
        let control = { value: 'a'.repeat(3)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });

      it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        //let control = { value: ' je le veux '.repeat(1)}
        let control = { value : ' '.repeat(3) + 'a'.repeat(3) + ' '.repeat(3)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });
      
      it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        //let control = { value: ' xx'.repeat(1)}
        let control = { value : ' '.repeat(1) + 'a'.repeat(2)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
      
      it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
        //let control = { value: ' x'.repeat(1)}
        let control = { value : ' '.repeat(2) + 'a'.repeat(1)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });

      it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        //let control = { value: ' xxx'.repeat(1)}
        let control = { value : ' '.repeat(3) + 'a'.repeat(3)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });

      it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        //let control = { value: ' xxxxx '.repeat(1)}
        let control = { value : ' '.repeat(5) + 'a'.repeat(5) +' '.repeat(5)}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeNull();
      });

      it('#14 | Une chaîne nulle est invalide ', () => {
        //let control = { value: null }
        let control = { value : null}
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
      });
})