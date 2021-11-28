import { DomainErrors } from 'src/domain/core/value-object/domain-errors';

export class LikePostInteractorErrors extends DomainErrors {
  userId: string[] = [];
  postId: string[] = [];
  other: string[] = [];
}
