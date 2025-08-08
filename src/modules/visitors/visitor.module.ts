import { Module } from "@nestjs/common";
import { VisitorService } from "./visitor.service";

@Module({
    imports: [],
    controllers: [],
    providers: [VisitorService],
    exports: [VisitorService],
})
export class VisitorModule { }
