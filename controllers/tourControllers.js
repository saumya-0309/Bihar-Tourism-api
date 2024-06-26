
const bookTour = async (req, res) => {
    const {id , totalPrice , date , adult , children} = req.body; 
    if(!children || !totalPrice || !date || !adult || !id) {
        return res.status(400).json({
            status: false,
            message: 'Invalid data , please provide all required fields'
        })
    }
    const newBooking = await Booking.create({
        tourId: id,
        userId: req.user._id,
        date: date,
        status: 'pending',
        totalPrice: totalPrice,
        adults: adult,
        children: children,
    });
    return res.status(200).json({
        status: true,
        data: newBooking
    })
}

const approvedTour = async (req, res) => {
    const {id} = req.body;
    if(!id) {
        return res.status(400).json({
            status: false,
            message: 'Invalid data , please provide all required fields'
        })
    }
    await Booking.findByIdAndUpdate(id, {status: 'approved'}, {new: true}, (err, data) => {
        if(err) {
            return res.status(400).json({
                status: false,
                message: err
            })
        }
        return res.status(200).json({
            status: true,
            data: data
        })
    })
}

const cancelTour = (req, res) => {
    let {id , cancelReason} = req.body;
    if(!id  || !cancelReason) {
        return res.status(400).json({
            status: false,
            message: 'Invalid data , please provide all required fields'
        })
    }
    if(req.user.role === 'admin') {
        cancelReason = "Cancel by admin , " + cancelReason;
    }else{
        cancelReason = "Cancel by user , " + cancelReason;
    }

    Booking.findByIdAndUpdate(id, {status: 'cancelled' , cancelReason }, {new: true}, (err, data) => {
        if(err) {
            return res.status(400).json({
                status: false,
                message: err
            })
        }
        return res.status(200).json({
            status: true,
            data: data
        })
    })
}

const addTour = async (req , res) => {
    const {title, description, Image, duration, date , adultCost , ChildCost} = req.body;
    if(!title ||!description ||!Image ||!duration ||!adultCost ||!ChildCost ||!date) {
        return res.status(400).json({
            status: false,
            message: 'Invalid data , please provide all required fields'
        })
    }
    const authorId = req.user.id;
    const addTour = await Tour.create({
        title,
        description,
        Image,
        duration,
        date,
        adultCost,
        ChildCost,
        authorId
    });
    return res.status(200).json({
        status: true,
        data: addTour
    })
}

module.exports = {bookTour , approvedTour , cancelTour , addTour};