import { Request, Response } from "express";
import { Event } from "../models";
import { IEvent } from "../types/types";
import { ObjectId } from "mongoose";


export const getEvents = async(req: Request, res: Response) => {

  const events = await Event.find()
                            .populate('user', 'name');

  res.json({
    ok: true,
    events
  })

}


export const createEvent = async(req: Request, res: Response) => {

  const requestBody = (req.body) as IEvent;

  const event = new Event(requestBody);

  try {
    event.user = requestBody.user.uid;
    
    await event.save();

    res.status(201).json({
      ok: true,
      event
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    });
  }
  
}

export const updateEvent = async(req: Request, res: Response) => {

  const eventId = req.params.id;

  const requestBody = (req.body) as IEvent;

  try{

    const event = await Event.findById( eventId );

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      });
    }

    if(event.user.toString() !== requestBody.user.uid){
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to edit this event'
      });
    }

    const newEvent = {
      ...requestBody,
      user: requestBody.user.uid
    }

    const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    res.json({
      ok: true,
      event: updatedEvent
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    });
  }

}

export const deleteEvent = async(req: Request, res: Response) => {
  const eventId = req.params.id;

  const requestBody = (req.body) as IEvent;

  try{

    const event = await Event.findById( eventId );

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      });
    }

    if(event.user.toString() !== requestBody.user.uid){
      return res.status(401).json({
        ok: false,
        msg: 'You do not have the privilege to delete this event'
      });
    }

    await Event.findByIdAndDelete( eventId );

    res.json({
      ok: true,
      msg: 'Event deleted'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    });
  }
}