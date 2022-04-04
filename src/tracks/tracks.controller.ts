import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  getAll(@Query() album: string) {
    if (album) {
      return this.trackModel.find({ _id: album });
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
}
