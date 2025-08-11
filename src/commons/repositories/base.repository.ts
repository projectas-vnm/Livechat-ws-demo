import {
    Document,
    FilterQuery,
    Model,
    UpdateQuery
} from "mongoose";

export abstract class BaseRepository<T extends Document> {
    constructor(protected readonly model: Model<T>) { }

    async create(createDto: Partial<T>): Promise<T> {
        const created = new this.model(createDto);
        return created.save();
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find({ ...filter, isDeleted: false }).exec();
    }

    async findOne(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, isDeleted: false } as FilterQuery<T>).exec();
    }

    async update(id: string, updateDto: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    async remove(id: string): Promise<T | null> {
        const now = new Date();
        return this.model.findByIdAndUpdate(
            id,
            { isDeleted: true, deletedAt: now } as UpdateQuery<T>,
            { new: true }
        ).exec();
    }

    async hardDelete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async restore(id: string): Promise<T | null> {
        return this.model.findByIdAndUpdate(
            id,
            {
                isDeleted: false,
                deletedAt: null,
                deletedBy: null,
            } as UpdateQuery<T>,
            { new: true }
        ).exec();
    }
}
