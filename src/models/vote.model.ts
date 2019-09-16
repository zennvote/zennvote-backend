import * as mongoose from 'mongoose';

export interface Vote extends mongoose.Document {
  data: VoteData;
  email: string;
  password: string;
  salt: string;
}

export interface VoteData extends mongoose.Document{
  problem: number[];
  pitch: string[] | undefined;
  voice: string[] | undefined;
  funny: string[] | undefined;
  content: string[] | undefined;
  original: string[] | undefined;
  sleep: string | undefined;
  unit: string | undefined;
  new: string | undefined;
  grow: string | undefined;
  master: string[] | undefined;
  custom: {
    episode: string;
    content: string;
  }[] | undefined;
  message: {
    name: string;
    content: string;
  }[] | undefined;
}

const voteDataSchema = new mongoose.Schema({
  problem: { type: [Number], required: true },
  pitch: [String],
  voice: [String],
  funny: [String],
  content: [String],
  original: [String],
  sleep: String,
  unit: String,
  new: String,
  grow: String,
  master: [String],
  custom: [new mongoose.Schema({
    episode: { type: String, required: true },
    content: { type: String, required: true },
  })],
  message: [new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
  })],
});

const voteSchema = new mongoose.Schema({
  data: voteDataSchema,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: {type: String, required: true },
});

// tslint:disable-next-line: variable-name
export const VoteModel = mongoose.model<Vote>('Vote', voteSchema);
