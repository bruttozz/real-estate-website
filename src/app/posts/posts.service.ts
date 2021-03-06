import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { PostModel } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: PostModel[]}>('http://localhost:8000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: PostModel = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:8000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
