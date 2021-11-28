import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LikePostArgDto {
  @Field()
  postId!: string;
}
