import express from 'express';
import mongoose from 'mongoose';
import io from 'socket.io';

import lostAnimalsModel from './models/lost-animals';
import foundAnimalsModel from './models/found-animals';
import messagesModel from './models/messages.js';


const db = mongoose.connect('mongodb://mstanev:qwerty@ds039155.mongolab.com:39155/testdb-mstanev');
let lostAnimalsRouter = express.Router(),
    helper = {};

lostAnimalsRouter.route('/lost-animals/:category')
    .post(function (req, res) {
        var lostAnimal = new lostAnimalsModel(req.body);
        lostAnimal.save();

        res.status(201).send(lostAnimal);
    })
    .get(function (req, res) {
        lostAnimalsModel.find(
            {animal: req.params.category},
            (error, lostAnimals) => {
                if(error) {
                    res.status(500).send(error);
                }  else {
                    res.json(lostAnimals);
                }
            });
    });

lostAnimalsRouter.route('/found-animals/:category')
    .post(function (req, res) {
        var foundAnimal = new foundAnimalsModel(req.body);
        foundAnimal.save();

        res.status(201).send(foundAnimal);
    })
    .get(function (req, res) {
        foundAnimalsModel.find((error, foundAnimals) => {
            if(error) {
                res.status(500).send(error);
            }  else {
                res.json(foundAnimals);
            }
        });
    });

lostAnimalsRouter.route('/messages/:category')
    .post(function (req, res) {
        var messages = new messagesModel(req.body);
        messages.secondaryId = req.params.category;

        messages.save().then(function () {

        });

        res.status(201).send(messages);
    })
    .get(function (req, res) {
        messagesModel.find(
            {secondaryId: req.params.category},
            (error, messages) => {
                if(error) {
                    res.status(500).send(error);
                }  else {
                    res.json(messages);
                }
            });
    });


export default lostAnimalsRouter;
