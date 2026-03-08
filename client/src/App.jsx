import { useMemo, useState } from "react";

const API_BASE = "http://localhost:4000/api";

const starterJava = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`;

export default function App() {
  const [username, setUsername] = useState("reyes");
  const [session, setSession] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [code, setCode] = useState(starterJava);
  const [stdinInput, setStdinInput] = useState("5 7");
  const [compileResult, setCompileResult] = useState("");

  const greeting = useMemo(() => {
    if (!session) return "Welcome to UNC CodeArena";
    return session.role === "teacher"
      ? `Teacher Portal · ${session.name}`
      : `Student Portal · ${session.name}`;
  }, [session]);

  const login = async () => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      setCompileResult("Login failed.");
      return;
    }

    const data = await response.json();
    setSession(data.user);

    const dashboardRes = await fetch(
      data.user.role === "teacher"
        ? `${API_BASE}/teacher/${data.user.id}/dashboard`
        : `${API_BASE}/student/${data.user.id}/dashboard`
    );
    setDashboard(await dashboardRes.json());
  };

  const runCode = async () => {
    const response = await fetch(`${API_BASE}/compiler/java`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceCode: code, stdinInput })
    });
    const data = await response.json();
    setCompileResult(`stdout:\n${data.stdout || ""}\n\nstderr:\n${data.stderr || ""}`);
  };

  return (
    <main className="container">
      <h1>UNC CodeArena</h1>
      <p className="subtitle">{greeting}</p>

      <section className="card">
        <h2>Login (demo)</h2>
        <div className="row">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          <button onClick={login}>Sign in</button>
        </div>
        <p className="hint">Try: reyes (teacher), alyssa/marco/lianne (students)</p>
      </section>

      {dashboard && session?.role === "teacher" && (
        <section className="card">
          <h2>Class Analytics</h2>
          <p>
            Students: <strong>{dashboard.totalStudents}</strong> · Average completion: <strong>{dashboard.averageCompletion}%</strong>
          </p>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Solved</th>
                <th>Attempted</th>
                <th>Completion</th>
                <th>Grade Estimate</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.classOverview.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentName}</td>
                  <td>{student.solved}</td>
                  <td>{student.attempted}</td>
                  <td>{student.completionRate}%</td>
                  <td>{student.gradeEstimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {dashboard && session?.role === "student" && (
        <section className="card">
          <h2>My Progress</h2>
          <p>
            Solved: <strong>{dashboard.metric.solved}</strong> · Completion: <strong>{dashboard.metric.completionRate}%</strong> · Grade: <strong>{dashboard.metric.gradeEstimate}</strong>
          </p>
          <h3>Recommended Problems</h3>
          <ul>
            {dashboard.recommendedProblems.map((problem) => (
              <li key={problem.id}>
                {problem.title} ({problem.difficulty})
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card">
        <h2>Java Compiler (Docker)</h2>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={14} />
        <input value={stdinInput} onChange={(e) => setStdinInput(e.target.value)} placeholder="stdin e.g. 5 7" />
        <button onClick={runCode}>Run Java Code</button>
        <pre>{compileResult}</pre>
      </section>
    </main>
  );
}
