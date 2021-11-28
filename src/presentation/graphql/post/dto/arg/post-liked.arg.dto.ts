import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostLikedArgDto {
  @Field()
  postId!: string;
}
