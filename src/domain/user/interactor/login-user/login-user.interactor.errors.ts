import { DomainErrors } from 'src/domain/core/value-object/domain-errors';

export class LoginUserInteractorErrors extends DomainErrors {
  username: string[] = [];
  password: string[] = [];
}
