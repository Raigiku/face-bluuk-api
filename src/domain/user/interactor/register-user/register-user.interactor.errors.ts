import { DomainErrors } from '../../../core/value-object/domain-errors';

export class RegisterUserInteractorErrors extends DomainErrors {
  username: string[] = [];
  password: string[] = [];
}
