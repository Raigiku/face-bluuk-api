import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostArgDto {
  @Field()
  text!: string;
}
