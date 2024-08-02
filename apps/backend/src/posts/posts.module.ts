import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { FirebaseModule } from "src/firebase/firebase.module";

@Module({
    imports:[FirebaseModule],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}