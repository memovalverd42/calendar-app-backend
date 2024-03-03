import { FlatRecord, model, Schema } from "mongoose";

interface IEventModel {
  _id: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  user: string;
  __v: number;
}

const EventSchema = new Schema({

  title: {
    type: String,
    required: [true, 'The title is required']
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: [true, 'The start date is required']
  },
  end: {
    type: Date,
    required: [true, 'The end date is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The user is required']
  }

});

EventSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject<FlatRecord<IEventModel>>();
  return {id: _id, ...object};
})

export const Event = model<IEventModel>('Event', EventSchema);