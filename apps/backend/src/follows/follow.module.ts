import { Module } from "@nestjs/common";
import { FollowsController } from "./follow.controller";
import { FollowsService } from "./follow.service";
import { FirebaseModule } from "src/firebase/firebase.module";

@Module({
    imports: [FirebaseModule],
    controllers: [FollowsController],
    providers: [FollowsService]
})
export class FollowsModule {}