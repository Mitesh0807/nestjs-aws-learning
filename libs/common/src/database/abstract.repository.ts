import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AstractRepository<T extends AbstractDocument> {
  protected readonly logger: Logger
  constructor(protected readonly model: Model<T>) { }

  async create(doc: Omit<T, "_id">): Promise<T> {
    const createdDoc = new this.model({
      ...doc,
      _id: new Types.ObjectId()
    })
    return (await createdDoc.save()).toJSON() as unknown as T
  }

  async findOne(query: FilterQuery<T>): Promise<T> {
    const doc = await this.model.findOne(query)
      .lean<T>(true)
    if (!doc) {
      this.logger.warn(" Document not found", query);
      throw new NotFoundException("Document not found");
    }
    return doc;
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    const docs = await this.model.find(query)
      .lean<T[]>(true)
    if (!docs) {
      this.logger.warn(" Document not found", query);
      throw new NotFoundException("Document not found");
    }
    return docs;
  }

  async updateOne(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
    const doc = await this.model.findOneAndUpdate(query, update, { new: true }).lean<T>(true)
    if (!doc) {
      this.logger.warn(" Document not found", query);
      throw new NotFoundException("Document not found");
    }
    return doc;
  }

  async findOneAndDelete(query: FilterQuery<T>): Promise<T> {
    const doc = await this.model.findOneAndDelete(query).lean<T>(true)
    if (!doc) {
      this.logger.warn(" Document not found", query);
      throw new NotFoundException("Document not found");
    }
    return doc;
  }
}
