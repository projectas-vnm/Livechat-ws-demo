import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
    Types,
} from 'mongoose';

export class BaseRepository<TEntity, TDocument = TEntity> {
    constructor(protected readonly model: Model<TDocument>) { }

    async create(data: Partial<TEntity>): Promise<TEntity> {
        const created = await this.model.create(data as any);
        return created.toObject() as TEntity;
    }

    async findAll(
        filter: FilterQuery<TDocument> = {},
    ): Promise<TEntity[]> {
        const result = await this.model.find(filter).lean().exec();
        return result as unknown as TEntity[];
    }

    async findOne(filter: FilterQuery<TDocument>): Promise<TEntity | null> {
        const result = await this.model.findOne(filter).lean().exec();
        return result as unknown as TEntity | null;
    }

    async findById(id: string | Types.ObjectId): Promise<TEntity | null> {
        const result = await this.model.findById(id).lean().exec();
        return result as unknown as TEntity | null;
    }

    async update(
        filter: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
        options: QueryOptions = { new: true },
    ): Promise<TEntity | null> {
        const result = await this.model.findOneAndUpdate(filter, update, options).lean().exec();
        return result as unknown as TEntity | null;
    }

    async delete(filter: FilterQuery<TDocument>): Promise<void> {
        await this.model.deleteOne(filter).exec();
    }

    async paginate(
        filter: FilterQuery<TDocument>,
        page = 1,
        limit = 10,
    ): Promise<{ data: TEntity[]; total: number; page: number; totalPages: number }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filter).skip(skip).limit(limit).lean().exec(),
            this.model.countDocuments(filter),
        ]);

        return {
            data: data as unknown as TEntity[],
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}
