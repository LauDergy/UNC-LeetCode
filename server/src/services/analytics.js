export const getStudentMetrics = ({ student, submissions, problems }) => {
  const byProblem = new Map();
  submissions
    .filter((sub) => sub.studentId === student.id)
    .forEach((sub) => {
      const current = byProblem.get(sub.problemId);
      if (!current || sub.score > current.score) {
        byProblem.set(sub.problemId, sub);
      }
    });

  const solved = [...byProblem.values()].filter((sub) => sub.status === "Accepted").length;
  const earned = [...byProblem.values()].reduce((sum, sub) => sum + sub.score, 0);
  const totalPossible = problems.reduce((sum, problem) => sum + problem.maxPoints, 0);
  const completionRate = totalPossible ? Math.round((earned / totalPossible) * 100) : 0;

  return {
    studentId: student.id,
    studentName: student.name,
    solved,
    attempted: byProblem.size,
    completionRate,
    gradeEstimate: completionRate >= 90 ? "A" : completionRate >= 80 ? "B" : completionRate >= 70 ? "C" : "Needs Improvement"
  };
};
