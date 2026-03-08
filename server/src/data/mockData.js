export const users = [
  { id: "t1", name: "Prof. Reyes", username: "reyes", role: "teacher", classCode: "IT221" },
  { id: "s1", name: "Alyssa Cruz", username: "alyssa", role: "student", teacherId: "t1", yearLevel: "2nd Year" },
  { id: "s2", name: "Marco Natividad", username: "marco", role: "student", teacherId: "t1", yearLevel: "2nd Year" },
  { id: "s3", name: "Lianne de Vera", username: "lianne", role: "student", teacherId: "t1", yearLevel: "2nd Year" }
];

export const problems = [
  { id: "p1", title: "UNC Sum of Two", difficulty: "Easy", maxPoints: 100 },
  { id: "p2", title: "Bicol Prime Hunt", difficulty: "Medium", maxPoints: 120 },
  { id: "p3", title: "Naga Grid Paths", difficulty: "Hard", maxPoints: 150 }
];

export const submissions = [
  { id: "sub1", studentId: "s1", problemId: "p1", status: "Accepted", score: 100, language: "Java", submittedAt: "2026-01-03T08:10:00Z" },
  { id: "sub2", studentId: "s1", problemId: "p2", status: "Accepted", score: 110, language: "Java", submittedAt: "2026-01-05T13:40:00Z" },
  { id: "sub3", studentId: "s2", problemId: "p1", status: "Wrong Answer", score: 35, language: "Java", submittedAt: "2026-01-04T10:20:00Z" },
  { id: "sub4", studentId: "s2", problemId: "p1", status: "Accepted", score: 95, language: "Java", submittedAt: "2026-01-04T11:10:00Z" },
  { id: "sub5", studentId: "s3", problemId: "p1", status: "Accepted", score: 100, language: "Java", submittedAt: "2026-01-02T09:45:00Z" }
];
