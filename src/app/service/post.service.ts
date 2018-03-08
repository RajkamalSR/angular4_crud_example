import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import {AppError} from './../app-error'
import { NotFoundError } from './../not-found-error';
@Injectable()
export class PostService {

  private url:string = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http:Http) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPosts(post){
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePosts(post){
    return this.http.patch(this.url + '/' +post.id, JSON.stringify({isRead : true}))
  }

  deletePost(id){
    return this.http.delete(this.url + '/' +id)
      .catch((error:Response) => {
        if(error.status === 404){
          return Observable.throw(new NotFoundError)
        }else{
          return Observable.throw(new AppError(error))
        }
    
      })
  }

}
