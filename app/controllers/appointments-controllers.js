const db = require("../models");
const BoilerTypes = db.boilerTypes;

exports.create = (req, res)  => {
    if(!req.body.boilerId || !req.body.buildingId || !req.body.start_timestamp || !req.body.end_timestamp){
        return res.status(400).send({
            message: "Data to create can not be empty"
        });
    }
    const newAppointments = new Appointments({
        id: req.body.id,
        boilerId: req.body.boilerId,
        buildingId: req.body.buildingId,
        start_timestamp: req.body.start_timestamp,
        end_timestamp: req.body.end_timestamp
    });
    newAppointmets
        .save(newAppointments)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating de Appointments"
            });
        });
};

exports.findAll = (req, res) => {
    Appointments.find({})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving appointments"
            });
        });
};

exports.findOne = (req, res) =>{
    Appointments.findOne({id: req.params.id})
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    message: `Appointments with id ${req.params.id} was not found`
                })
            }
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving appointments"
            });
        });
};

exports.findOne = (req, res) =>{
    Appointments.findOne({id: req.params.value})
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    message: `Appointments with id ${req.params.value} was not found`
                })
            }
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving appointments"
            });
        });
};

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty"
        });
    }

    const id = req.params.id;

    Appointments.findOneAndUpdate({id}, req.body, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: "Cannot update appointments with id = ${id}. Maybe appointments was not found!"
                });
            }else{
                res.send({
                    message: `appointments was updated succesfully`
                });
            }
        })
}

exports.delete = (req, res) =>{
    const id = req.params.id;
    Appointments.findOneAndRemove({id}, { useFindAndModify: false })
        .then(data =>
            res.send({ message: "Appointments was removed successifully"})
        )
        .catch(err =>{
            res.status(500).send({
                message: "Error removing appointments with id = "+  id
            });
        });
};