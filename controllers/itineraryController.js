import Itinerary from '../models/Itinerary.js'

// C
export const postRegisterItinerary = async (req, res, next) => {
    const { 
        body: { title, description, routes }
    } = req;
    try {
        const newItin = await Itinerary.create({
            creator: req.user.id,
            title,
            description,
            routes,
        });
        req.user.itinerary.push(newItin.id);
        req.user.save();
        res.status(200).json({
            message : "Success Upload Itinerary",
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
            message : "Success Upload Itinerary",
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
        params : {id},
        body : {title, description, routes}
    } = req;
    try {
        const itin = await Itinerary.findByIdAndUpdate({_id : id}, {title, description, routes});
        res.status(200).json({
            message : "Success Update Itinerary",
            itin
        })
    } catch(err){ 
        console.log(`Failed to edit Itinerary ${err}`);
        res.status(400).json({
            message : "Failed to edit Itinerary",
            error : err
        });
        
    }
}