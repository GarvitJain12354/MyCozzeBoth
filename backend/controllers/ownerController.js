const errorHanler = require("../error/errorHandler");
const { sendToken } = require("../jwt/sendToken");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Owner = require("../models/ownerModel");
const RentAgreement = require("../models/RentAgreementModel");
const Room = require("../models/roomModel");
const User = require("../models/userModel");
const path = require("path");
const imagekit = require("../middlewares/imagekit").initimagekit();

exports.loginOwner = CatchAsyncErrors(async (req, res, next) => {
  const userModel = await User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!userModel) return next(new errorHanler("User not found", 500));
  const isMatch = userModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (userModel.role !== "owner")
    return next(new errorHanler("Wrong Owner Credentials", 500));
  sendToken(userModel, 201, res);
});
// isOwner
exports.isOwner = CatchAsyncErrors(async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.user.id);
    res.status(200).json({
      owner,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Add pg
exports.addPg = CatchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.files?.images);
    const owner = await User.findById(req.user.id);
    if(owner.currentPlan === null || owner.currentPlan === ""){
      return res.status(400).json({
        message: "Please subscribe to a plan",
        success: false,
      });
    }
    // if()
    var obj = req.body;
    // console.log(obj);

    obj.amenities = JSON.parse(req.body.amenities);
    obj.rent = JSON.parse(req.body.rent);
    obj.mobile = Number(req.body.mobile);
    obj.elecricityCharges = Number(req.body.elecricityCharges);
    
    
    const pg = await new Room(obj).save();
    // const owner = await User.findById(req.user.id);
    const file = req.files?.images;
    // console.log(file);

    if (file && file.length > 0) {
      const singleimg = await Promise.all(
        file.map(async (i) => {
          const modifiedFileName = `roomImage-${Date.now()}${path.extname(
            i.name
          )}`;
          const { fileId, url } = await imagekit.upload({
            file: i.data,
            fileName: modifiedFileName,
          });
          return { fileId, url };
        })
      );

      pg.images.push(...singleimg);
    }
    owner.rooms.push(pg._id);
    pg.owner = owner._id;
    await pg.save();
    await owner.save();
    console.log(pg);

    res.status(201).json({
      message: "PG details added succesfully",
      pg,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
// GET PG
exports.getAllPg = CatchAsyncErrors(async (req, res) => {
  try {
    const owner = await User.findById(req.user._id).populate("rooms");
    //  console.log(owner);

    res.status(200).json({
      room: owner.rooms,
      success: true,
      // message:"Rooms "
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});
// Update Pg details
exports.updatePg = CatchAsyncErrors(async (req, res, next) => {
  try {
    const pg = await Room.findByIdAndUpdate(req.params.id, req.body);
    if (req.body.files && req.body.files.length > 0) {
      pg.images.forEach(async (i) => {
        await imagekit.deleteFile(i.fileId);
      });
      const singleimg = await Promise.all(
        file.map(async (i) => {
          const modifiedFileName = `roomImage-${Date.now()}${path.extname(
            i.name
          )}`;
          const { fileId, url } = await imagekit.upload({
            file: i.data,
            fileName: modifiedFileName,
          });
          return { fileId, url };
        })
      );

      pg.images.push(...singleimg);
      await pg.save();
    }
    res.status(200).json({
      message: "PG Updated Successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Delete PG
exports.deletePg = CatchAsyncErrors(async (req, res, next) => {
  try {
    const pg = await Room.findById(req.params.id).populate("owner");
    const user = await User.findById(req.user.id).exec();
    // console.log(pg);

    if (pg.owner._id.toString() !== user._id.toString()) {
      return res.status(404).json({
        message: `Room is not added by ${user.firstname} + ${user?.lastname}`,
        success: false,
      });
    }
    const filterList = user.rooms?.filter(
      (i) => i._id.toString() !== pg._id.toString()
    );
    user.rooms = filterList;
    await user.save();

    pg.images.forEach(async (i) => {
      await imagekit.deleteFile(i.fileId);
    });
    const list = await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "PG Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});
// get owner pg's
exports.getOwnerPg = CatchAsyncErrors(async (req, res, next) => {
  try {
    const owner = await User.findById(req.user.id).populate("rooms");
    res.status(200).json({
      roome: owner.rooms,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.uploadRentAgreement = CatchAsyncErrors(async (req, res, next) => {
  try {
    const agreement = await new RentAgreement(req.body).save();
    res.status(201).json({
      message: "Agreement uploaded successfully",
    });
  } catch (error) {}
});
