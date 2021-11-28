import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostLikedResponseDto {
  @Field()
  postId!: string;
}
