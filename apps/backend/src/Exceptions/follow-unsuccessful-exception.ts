import { HttpException, HttpStatus } from '@nestjs/common';

export class FollowException extends HttpException {
    constructor(isFollow: boolean, type: string, currUser: string, otherUser: string) {

        if (isFollow) {
            switch (type) {
                case "follow": 
                    super(`Could not follow user: ${otherUser} - Check server logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
                case "follower": 
                    super(`Could not add following field to ${otherUser} for user: ${currUser} - Check server logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
                default:
                    super(`Could not follow - Check logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
            }
        }
        else if (!isFollow) {
            switch (type) {
                case "unfollow": 
                    super(`Could not unfollow user: ${otherUser} - Check server logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
                case "unfollower": 
                    super(`Could not remove following field from ${otherUser} for user: ${currUser} - Check server logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
                default:
                    super(`Could not unfollow - Check logs`, HttpStatus.INTERNAL_SERVER_ERROR)
                    break;
            }
        }
    }
}