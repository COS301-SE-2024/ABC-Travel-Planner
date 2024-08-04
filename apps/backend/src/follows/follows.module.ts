import { Module } from "@nestjs/common";
import { FollowsController } from "./follows.controller";
import { FollowsService } from "./follows.service";
import { FirebaseModule } from "src/firebase/firebase.module";

@Module({
    imports: [FirebaseModule],
    controllers: [FollowsController],
    providers: [FollowsService]
})
export class FollowsModule {}