import { Module } from "@nestjs/common";
import { FirebaseModule } from "src/firebase/firebase.module";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";

@Module({
    imports:[FirebaseModule],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}