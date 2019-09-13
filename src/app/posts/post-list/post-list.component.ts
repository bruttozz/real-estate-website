import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';

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
  @Input() posts: PostModel[] = [];
  // postsService:

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
  }

}
