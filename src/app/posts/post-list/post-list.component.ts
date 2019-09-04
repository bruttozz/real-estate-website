import { Component, Input } from '@angular/core';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  // array = [
  //   { title: 'Student', content: 'students' },
  //   { title: 'Landlord', content: 'rich man' },
  //   { title: 'Agency', content: 'zhongjie' }
  // ];
  @Input() posts: PostModel[] = [];
}
