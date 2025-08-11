import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export class Base {
    _id: Types.ObjectId;

    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: "User" })
    createdBy: string;

    @Prop({ default: Date.now, required: true })
    updatedAt: Date;

    @Prop({ type: { type: Types.ObjectId, ref: "User" } })
    updatedBy?: string;

    @Prop({ default: null })
    deletedAt: Date;

    @Prop({ type: Types.ObjectId, ref: "User" })
    deletedBy?: string;

    @Prop({ default: false })
    isDeleted: boolean;
}

export type BaseDocument = HydratedDocument<Base>;

export const BaseEntitySchema = SchemaFactory.createForClass(Base);