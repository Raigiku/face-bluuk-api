import { DomainErrors } from 'src/domain/value-object/domain-errors';

export class CreatePostInteractorErrors extends DomainErrors {
  userId: string[] = [];
  text: string[] = [];
}
