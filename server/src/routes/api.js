import express from "express";
import { problems, submissions, users } from "../data/mockData.js";
import { getStudentMetrics } from "../services/analytics.js";
import { runJavaInDocker } from "../services/javaRunner.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.post("/auth/login", (req, res) => {
  const { username } = req.body;
  const user = users.find((u) => u.username.toLowerCase() === String(username).toLowerCase());

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.json({ user });
});

router.get("/teacher/:teacherId/dashboard", (req, res) => {
  const { teacherId } = req.params;
  const teacher = users.find((user) => user.id === teacherId && user.role === "teacher");

  if (!teacher) {
    res.status(404).json({ message: "Teacher not found." });
    return;
  }

  const students = users.filter((user) => user.role === "student" && user.teacherId === teacherId);
  const classOverview = students.map((student) => getStudentMetrics({ student, submissions, problems }));

  res.json({
    teacher,
    classOverview,
    totalStudents: students.length,
    totalProblems: problems.length,
    averageCompletion:
      classOverview.length > 0
        ? Math.round(classOverview.reduce((sum, student) => sum + student.completionRate, 0) / classOverview.length)
        : 0
  });
});

router.get("/student/:studentId/dashboard", (req, res) => {
  const { studentId } = req.params;
  const student = users.find((user) => user.id === studentId && user.role === "student");

  if (!student) {
    res.status(404).json({ message: "Student not found." });
    return;
  }

  const metric = getStudentMetrics({ student, submissions, problems });
  const studentSubmissions = submissions.filter((sub) => sub.studentId === studentId);

  res.json({
    student,
    metric,
    submissions: studentSubmissions,
    recommendedProblems: problems.filter((problem) => !studentSubmissions.some((sub) => sub.problemId === problem.id))
  });
});

router.post("/compiler/java", async (req, res) => {
  const { sourceCode, stdinInput } = req.body;

  if (!sourceCode) {
    res.status(400).json({ message: "sourceCode is required" });
    return;
  }

  try {
    const result = await runJavaInDocker(sourceCode, stdinInput);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
