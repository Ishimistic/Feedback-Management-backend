import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;

    const feedback = new Feedback({
      title,
      description,
      priority,
      category,
      user: req.user._id,
      status: "Pending",
      dateSubmitted: new Date(),
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback created successfully",
      feedback,
    });
  } catch (err) {
    console.log("Error in creating feedback: ", err);
    res
      .status(500)
      .json({ message: "Error submitting feedback form", error: err });
  }
};

export const updateOfFeedback = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ message: "Feedback updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error updating feedback.", error: err });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    //Admmin only
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks.", error: err });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found." });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetchig feedbcak", error: err });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body;
    const feedback = await Feedback.findByIdAndUpdate(id, status, {
      new: true,
    });
    if (!feedback)
      return res.status(404).json({ message: "Feedback Not Found" });
    res
      .status(200)
      .json({ message: "Feedback Updated successfully", feedback });
  } catch (err) {
    res.status(500).json({ message: "Error in updating feedback", err });
  }
};
