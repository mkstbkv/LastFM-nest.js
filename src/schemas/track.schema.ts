import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  name: string;

  @Prop({ ref: 'Album', required: true })
  album: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, default: false })
  is_published: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
