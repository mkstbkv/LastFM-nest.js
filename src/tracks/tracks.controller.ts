import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query() album: { [key: string]: string }) {
    if (album.album) {
      return this.trackModel.find({ album: album.album });
    }
    return this.trackModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackModel.findById(id);
  }

  @Post()
  create(@Body() trackData: CreateTrackDto) {
    const track = new this.trackModel({
      name: trackData.name,
      album: trackData.album,
      duration: trackData.duration,
    });

    return track.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.trackModel.deleteOne({ _id: id });

    return { message: 'Deleted!' };
  }
}
