import { Vote, VoteModel, VoteData } from './vote.model';

export const createVote = async (vote: Vote) => new VoteModel(vote).save();

export const getVote = async (query: any) => await VoteModel.findOne(query);

export const getVotes = async (query: any) => await VoteModel.find(query);

export const updateVote = async (query: any, data: VoteData) =>
  await VoteModel.updateOne(query, { data });
