import Itinerary from '../models/Itinerary.js'

// C
export const postRegisterItinerary = async (req, res, next) => {
    const { 
        body: { title, description, routes }
    } = req;
    try {
        const newItin = await Itinerary.create({
            creator: req.user._id,
            title,
            description,
            routes,
        });
        // req.user.itinerary.push(newItin.id);
        // req.user.save();
        res.status(200).json({
            message : "Success Upload Itinerary",
            init : newItin
        })
    } catch(err) {
        console.log(`Register itinerary Error : ${err}`);
        res.status(400).json({
            message : "Failed to Upload Itinerary",
            error : err
        });
    }
}

// R
export const getDetailItinerary = async (req, res, next) => {
    const { 
        params: { id }
    } = req;
    try {
        const itinerary = await Itinerary.findById(id)
            .populate("creator") // 사용자 정보 얻어오기
        res.status(200).json({
            message : "Success Get Itinerary",
            itinerary
        })
    } catch(err) {
        console.log(`Get Detail itinerary Error : ${err}`);
        res.status(400).json({
            message : "Failed to get Itinerary",
            error : err
        });
    }
}

// U
export const postEditItinerary = async (req, res, next) => {
    const {
        body : {title, description, routes},
        params : {id},
    } = req;
    try {
        console.log(id);
        await Itinerary.findOneAndUpdate({_id : id}, {title, description, routes});
        res.status(200).json({
            message : "Success Update Itinerary",
        })
    } catch(err){ 
        console.log(`Failed to Update Itinerary ${err}`);
        res.status(400).json({
            message : "Failed to Update Itinerary",
            error : err
        });   
    }
}

// D
export const getDeleteItinerary = async (req, res, next) => {
    const {
        params : {id}
    } = req;
    try {
        const itin = await Itinerary.findById(id);
        if(itin.creator != req.user.id) {
            throw Error();
        } else {
            await Itinerary.deleteOne({_id : id});
            res.status(200).json({
                message : "Success To Delete itinerary"
            })
        }
    } catch(err) {
        console.log(`Failed to Delete item \n${err}`);
        res.status(400).json({
            message : "Failed to Delete Itinerary",
            error : err
        })
    }
}