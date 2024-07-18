const Course = require("../models/Course");

class SiteController {
  //   async index(req, res) {
  //     try {
  //       const courses = await CourseModel.find({});
  //       res.json(courses);
  //     } catch (error) {
  //       res.status(400).json({ error: "Error" });
  //     }
  //   }
  index(req, res) {
    Course.find({})
      .then((courses) => res.json(courses))
      .catch((err) => res.status(400).json({ error: "message" }));
  }
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
