import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LikePostDto {
  @Field()
  postId!: string;
}
