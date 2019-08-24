import * as mongoose from 'mongoose';

interface Vote extends mongoose.Document {
  data: VoteData;
  email: string;
}

interface VoteData extends mongoose.Document{
  problem: number[];
  pitch: string[];
  voice: string[];
  funny: string[];
  content: string[];
  original: string[];
  sleep: string;
  unit: string;
  new: string;
  grow: string;
  master: string[];
  custom: [{
    episode: string;
    content: string;
  }],
  message: {
    name: string;
    content: string;
  }[];
}

const voteDataSchema = new mongoose.Schema({
  problem: [Number],
  pitch: [{ type: String, required: true }],
  voice: [{ type: String, required: true }],
  funny: [{ type: String, required: true }],
  content: [{ type: String, required: true }],
  original: [{ type: String, required: true }],
  sleep: { type: String, required: true },
  unit: { type: String, required: true },
  new: { type: String, required: true },
  grow: { type: String, required: true },
  master: [{ type: String, required: true }],
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
});

// tslint:disable-next-line: variable-name
export const VoteModel = mongoose.model<Vote>('Vote', voteSchema);