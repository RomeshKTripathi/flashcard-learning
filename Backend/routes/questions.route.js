import { Router } from "express";
import {
    addQuestion,
    countAllQuestions,
    deleteQuestion,
    getAllQuestions,
    getQuestionById,
    getQuestionsInRange,
    updateQuestion,
} from "../controllers/questions.controllers.js";

const router = Router();

router.route("/all").get(getAllQuestions);
router.route("/get-by-id/:id").get(getQuestionById);
router.route("/get-by-range").get(getQuestionsInRange);
router.route("/count-all").get(countAllQuestions);
router.route("/delete-by-id/:id").delete(deleteQuestion);
router.route("/add-question").post(addQuestion);
router.route("/update-question").patch(updateQuestion);

export default router;
