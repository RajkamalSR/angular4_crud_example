import { Component, OnInit } from '@angular/core';
import { PostService } from './service/post.service';
import { Response } from '@angular/http';
import { AppError } from './app-error';
import { NotFoundError } from './not-found-error';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    heading = 'Posts';
    isActive = true;
    posts: any[];
    constructor(private postService: PostService) {

    }

    ngOnInit() {
        this.postService.getPosts()
            .subscribe(
            response => {
                this.posts = response.json();
                // console.log(this.posts)
            })
    }

    createPost(input: HTMLInputElement) {
        let post: any = {
            title: input.value
        };
        input.value = '';
        this.postService.createPosts(post)
            .subscribe(response => {
                post.id = response.json().id;
                this.posts.splice(0, 0, post)
                // console.log(post.id);
            })
    }

    updatePost(post) {
        this.postService.updatePosts(post)
            .subscribe(
                response => {
                    console.log(response.json())
                },
                error => {
                    if (error.status == 404) {
                        alert();
                    }
                }
            );
        // this.http.patch(this.url, JSON.stringify(post));
    }

    deletePost(post) {
        this.postService.deletePost(post.id)
            .subscribe(
            response => {
                let index = this.posts.indexOf(post)
                this.posts.splice(index, 1);
            },
            (error: AppError) => {
                if (error instanceof NotFoundError) {
                    alert('This post already been deleted');
                } else {

                }
            })
    }
} 
