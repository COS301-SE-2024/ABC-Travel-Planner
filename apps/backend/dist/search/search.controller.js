"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const supabase_service_1 = require("../supabase/supabase.service");
let SearchController = class SearchController {
    constructor(searchService, supabaseService) {
        this.searchService = searchService;
        this.supabaseService = supabaseService;
    }
    async getCustomData() {
        const supabase = this.supabaseService.getClient();
        const { data: { user } } = await supabase.auth.getUser();
        let { data: Users, error } = await supabase
            .from('Users')
            .select('surname');
        if (error) {
            throw new Error(error.message);
        }
        return user;
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)('custom-query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getCustomData", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        supabase_service_1.SupabaseService])
], SearchController);
//# sourceMappingURL=search.controller.js.map