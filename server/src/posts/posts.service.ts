import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  private readonly posts: any[];
  constructor(private usersService: UsersService) {
    this.posts = new Array(200)
      .fill(1)
      .map(e => {
        return {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(3),
          postedAt: faker.date.past(),
          userId: this.getUserId(),
        };
      }).sort((e1, e2) => {
        if (e1.postedAt > e2.postedAt) {
          return 1;
        } else if (e1.postedAt === e2.postedAt) {
          return 0;
        } else { return -1}
    }).map((e,i) => {
      e['postId'] = i + 1;
      return e;
      });
  }

  getAll() {
    return this.posts;
  }
  private getUserId() {
     const users = this.usersService.getAll();
     const index = Math.floor(Math.random() * users.length);
     return users[index].id;
  }

}
