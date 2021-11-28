import { DomainErrors } from 'src/domain/core/value-object/domain-errors';

export class UnlikePostInteractorErrors extends DomainErrors {
  userId: string[] = [];
  postId: string[] = [];
  other: string[] = [];
}
