import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { BlockModule } from 'src/block/block.module';
@Module({
  imports: [FirebaseModule, BlockModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
