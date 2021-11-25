import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RootQuery {
  @Query(() => String)
  root(): string {
    return '';
  }
}
