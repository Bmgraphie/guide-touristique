import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Numéro sénégalais : 9 chiffres commençant par 7 ou 3, espaces et +221 acceptés. Ex. 77 123 45 67 */
export const TELEPHONE_SN = /^(\+221)?\s?[37]\d(\s?\d){7}$/;

/** E-mail avec un domaine et une extension (ex. nom@exemple.sn). Plus strict que Validators.email. */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validateur personnalisé : refuse un e-mail déjà utilisé par un autre guide.
 * @param dejaUtilise fonction fournie par le composant (elle interroge le service)
 */
export function emailUnique(dejaUtilise: (email: string) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valeur = String(control.value ?? '').trim();
    return valeur && dejaUtilise(valeur) ? { emailPris: true } : null;
  };
}
