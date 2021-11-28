export class PostLiked {
  static eventName = 'postLiked';
  constructor(
    readonly postLiked: {
      readonly postId: string;
    },
  ) {}
}
