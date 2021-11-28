import { DomainErrors } from 'src/domain/core/value-object/domain-errors';

export class CreatePostInteractorErrors extends DomainErrors {
  userId: string[] = [];
  text: string[] = [];
}
