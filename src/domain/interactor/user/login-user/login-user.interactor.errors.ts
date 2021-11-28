import { DomainErrors } from 'src/domain/value-object/domain-errors';

export class LoginUserInteractorErrors extends DomainErrors {
  username: string[] = [];
  password: string[] = [];
}
