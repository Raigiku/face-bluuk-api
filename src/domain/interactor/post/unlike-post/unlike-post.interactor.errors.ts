import { DomainErrors } from 'src/domain/value-object/domain-errors';

export class UnlikePostInteractorErrors extends DomainErrors {
  userId: string[] = [];
  postId: string[] = [];
  other: string[] = [];
}
