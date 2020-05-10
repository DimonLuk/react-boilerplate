class QuizService {
  getQuizes = () => {
    return window.client.apis["app"]["app_quiz_available_quizes"]();
  };
  startQuiz = (id) => {
    return window.client.apis["app"]["app_quiz_start_quiz"]({ id });
  };
  submitQuiz = (quizData) => {
    return window.client.apis["app"]["app_quiz_submit_quiz"](quizData);
  };
  getTakenQuizes = () => {
    return window.client.apis["app"]["app_quiz_taken_quizes"]();
  };
  getSubmittedReports = () => {
    return window.client.apis["app"]["app_quiz_submitted_reports"]();
  };
}
export default new QuizService();
