import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnlikePostDto {
  @Field()
  postId!: string;
}
