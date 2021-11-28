import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnlikePostArgDto {
  @Field()
  postId!: string;
}
