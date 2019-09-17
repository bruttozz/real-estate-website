import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  // array = [
  //   { title: 'Student', content: 'students' },
  //   { title: 'Landlord', content: 'rich man' },
  //   { title: 'Agency', content: 'zhongjie' }
  // ];
  posts: PostModel[] = [];
  private postsSub: Subscription;
  // postsService:

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
