import { spawn } from "node:child_process";

const IMAGE_NAME = process.env.JAVA_RUNNER_IMAGE || "unc-java-runner:latest";

export const runJavaInDocker = (sourceCode, stdinInput = "") =>
  new Promise((resolve, reject) => {
    const docker = spawn("docker", ["run", "--rm", "-i", IMAGE_NAME], { stdio: ["pipe", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    docker.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    docker.on("error", (error) => {
      reject(new Error(`Failed to execute docker command: ${error.message}`));
    });

    docker.on("close", (code) => {
      if (code !== 0) {
        resolve({ stdout, stderr: stderr || "Compilation or runtime error.", exitCode: code });
        return;
      }

      resolve({ stdout, stderr, exitCode: code });
    });

    docker.stdin.write(
      JSON.stringify({
        sourceCode,
        stdinInput
      })
    );
    docker.stdin.end();
  });
