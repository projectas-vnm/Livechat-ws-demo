import { Injectable } from "@nestjs/common";
import { VisitorDto } from "./dtos/visitor.dto";

@Injectable()
export class VisitorService {
    async InsertVisitor(body: VisitorDto) {

    }
}
