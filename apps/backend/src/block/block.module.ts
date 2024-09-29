import { Module } from "@nestjs/common";
import { FirebaseModule } from "src/firebase/firebase.module";
import { BlockService } from "./block.service";
import { BlockController } from "./block.controller";

@Module({
    imports:[FirebaseModule],
    controllers:[BlockController],
    providers:[BlockService],
    exports: [BlockService]
})

export class BlockModule{}