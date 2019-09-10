import { PostModel } from './post.model';

export class PostsService {
  private posts: PostModel[] = [];

  getPosts() {
    return this.posts;
  }

  addPost(title: string, content: string) {
    const post: PostModel = {title: title, content: content};
    this.posts.push(post);
  }
}
